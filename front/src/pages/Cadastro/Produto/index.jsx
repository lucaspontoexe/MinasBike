import React, { useState, useEffect } from 'react';
import api from 'services/api';
import { formatErrorsSingleObject } from 'utils/formatFieldErrors';
import formatSelectItem from 'utils/formatSelectItem';
import devlog from 'utils/devlog';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import Header from 'components/Header';
import Modal from 'components/Modal';
import SelectWithLabel from 'components/SelectWithLabel';
import { BPSelector } from './BPSelector';
import ProviderSelector from './ProviderSelector';

import '../styles.scss';

const str = item => JSON.stringify(item, null, 2);

const initialBpData = {
  product: { id: -2 },
  brand: { id: -2 },
  brandproduct: { id: -1, price: 5 },
};

export default function CadastroProduto({ history }) {
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);

  const [bpData, setBpData] = useState(initialBpData);

  const [prprData, setPrprData] = useState({ isValid: false, items: [] });

  const [productForm, setProductForm] = useState({});
  const [brandproductForm, setBrandproductForm] = useState({});
  const [stockForm, setStockForm] = useState({});

  const [errors, setErrors] = useState([{ fields: [], message: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // carrega categorias e unidades da API
  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data));
    api.get('/unities').then(({ data }) => setUnits(data));
  }, []);

  // é o jeito non-flux de resolver isso.
  const [shouldBPSelectorReset, setShouldBPSelectorReset] = useState(false);

  useEffect(() => setShouldBPSelectorReset(false), [bpData]);

  function handleChange(setStateHandler, { name, value }) {
    setStateHandler(old => ({ ...old, [name]: value }));
    devlog(name, value);
    devlog(brandproductForm, productForm, stockForm);
  }

  // função que leva em conta tanto os dados do form quanto do select.
  // dava pra juntar tudo num state só? dava.
  function postForm(endpoint, formData, selectorData) {
    if (selectorData.id >= 0) return { data: selectorData };
    return api.post(endpoint, { ...formData, ...selectorData, id: undefined });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    /* post sequence:
    
    1. /products; PRODUCT STUFF + name (save ID)
    2. /brands; name (save ID)
    3. /brandproducts; BP STUFF + saved IDs, (save ID as well)
    4. /stocks; STOCK STUFF + BP id
    5. (for each entry) /providerproducts; entry + bp.id
    */

    if (!prprData.isValid) {
      setErrors(e => ({ ...e, provider_id: 'invalid provider data' }));
      return;
    }

    setIsSubmitting(true);

    Promise.all([
      postForm('/products', productForm, bpData.product),
      postForm('/brands', bpData.brand, bpData.brand),
    ])
      .then(([productRes, brandRes]) =>
        postForm(
          '/brandproducts',
          {
            ...brandproductForm,
            brand_id: brandRes.data.id,
            product_id: productRes.data.id,
          },
          bpData.brandproduct
        )
      )
      .then(bpRes => {
        // por enquanto, não dá pra mandar array no request de prpr,
        // vamo disparar requests. rambo neles.

        const prprRequests = [];
        for (const item of prprData.items) {
          prprRequests.push(
            api.post('/providerproducts', {
              ...item,
              id: undefined,
              brandproduct_id: bpRes.data.id,
            })
          );
        }

        return Promise.all([
          api.post('/stocks', { ...stockForm, brandproduct_id: bpRes.data.id }),
          ...prprRequests,
        ]);
      })
      .catch(err => {
        setErrors(formatErrorsSingleObject(err.response.data));
        devlog(err);

        // reset EVERYTHING
        // não tem como resetar bpData. na verdade, o reset acontece internamente, mas
        // o texto ainda aparece lá. portanto bpdata fica do jeito que tá
        // e também é o mais difícil de falhar, então não deve dar problema.

        // setBpData(initialBpData);

        // update: resetar não é uma ideia tão interessante.
        // a treta tá em brandproduct.

        // portanto,
        setShouldBPSelectorReset(true);
      })
      .finally(() => {
        setIsSubmitting(false);
        history.push('/produtos');
      });
  }

  const isProductFormDisabled = bpData.product.id >= 0;
  const isBPFormDisabled = bpData.brandproduct.id >= 0;

  return (
    <div className="tela tela-cadastro">
      <Header>Novo Produto</Header>
      <form onSubmit={handleSubmit}>
        <BPSelector onChange={setBpData} shouldReset={shouldBPSelectorReset} />
        <span>{errors.brandproduct_id}</span>

        <div>
          {window.DEV_MODE && 'PRODUCT STUFF'}
          <TextBox
            required
            label="Descrição"
            name="description"
            error={errors.description}
            disabled={isProductFormDisabled}
            value={bpData.product.description}
            onChange={e => handleChange(setProductForm, e.target)}
          />
          {!isProductFormDisabled ? (
            <>
              <SelectWithLabel
                required
                label="Unidade de Medida"
                error={errors.unity_id}
                isDisabled={isProductFormDisabled}
                options={units.map(item => formatSelectItem(item.id, item.acronym))}
                onChange={sel =>
                  handleChange(setProductForm, { name: 'unity_id', value: sel.value })
                }
              />
              <SelectWithLabel
                required
                label="Categoria"
                error={errors.category_id}
                isDisabled={isProductFormDisabled}
                options={categories.map(item => formatSelectItem(item.id, item.name))}
                onChange={sel =>
                  handleChange(setProductForm, { name: 'category_id', value: sel.value })
                }
              />
            </>
          ) : (
            <>
              <TextBox
                label="Unidade de Medida"
                required
                disabled
                readOnly
                value={bpData.product.unity.acronym}
              />
              <TextBox
                label="Categoria"
                required
                disabled
                readOnly
                value={bpData.product.category.name}
              />
            </>
          )}
        </div>
        <div>
          {window.DEV_MODE && 'BP STUFF'}
          <>
            <TextBox
              required
              type="number"
              min="0"
              name="code"
              error={errors.code}
              disabled={isBPFormDisabled}
              value={bpData.brandproduct.code}
              label="Código de Barras"
              onChange={e => handleChange(setBrandproductForm, e.target)}
            />
            <TextBox
              required
              type="currency"
              name="price"
              error={errors.price}
              disabled={isBPFormDisabled}
              value={bpData.brandproduct.price}
              label="Preço"
              onChange={value => handleChange(setBrandproductForm, { name: 'price', value })}
            />
          </>
        </div>
        <div onChangeCapture={e => handleChange(setStockForm, e.target)}>
          {window.DEV_MODE && 'STOCK STUFF'}
          <TextBox
            required
            type="number"
            min="0"
            error={errors.current_qty}
            name="current_qty"
            label="Quantidade Atual em Estoque"
          />
          <TextBox
            required
            type="number"
            min="0"
            error={errors.min_qty}
            name="min_qty"
            label="Quantidade Mínima de Estoque"
          />
          <TextBox
            required
            type="number"
            min="0"
            error={errors.initial_qty}
            name="initial_qty"
            label="Quantidade Inicial em Estoque"
          />
        </div>

        <ProviderSelector
          onChange={setPrprData}
          brandproduct_id={bpData.brandproduct.id}
          useRuleTwo
        />
        {errors.provider_id && <span className="error">Erro: {errors.provider_id}</span>}

        <Button color="rgb(48, 204, 87)" type="submit">
          Cadastrar
        </Button>
      </form>

      {isSubmitting && <Modal type="loading" />}

      {window.DEV_MODE && (
        <pre>
          POST DATA: <br />
          is submitting: {isSubmitting ? 'true' : 'false'}
          <br />
          {'product form: ' + str(productForm) + '\n'}
          {'bp form: ' + str(brandproductForm) + '\n'}
          {'stock form: ' + str(stockForm) + '\n'}
          {'prpr selector: ' + str(prprData) + '\n'}
        </pre>
      )}
    </div>
  );
}
