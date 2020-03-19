import React, { useState } from 'react';
import api from 'services/api';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import Header from 'components/Header';
import SelectWithLabel from 'components/SelectWithLabel';
import { BPSelector } from './BPSelector';

// TODO: import from API
import categories from './categories.json';
import units from './units.json';
import { formatErrorsSingleObject } from 'utils/formatFieldErrors';
import ProviderSelector from './ProviderSelector';

const str = item => JSON.stringify(item, null, 2);

export default function CadastroProduto() {
  const [bpData, setBpData] = useState({
    product: { id: -2 },
    brand: { id: -2 },
    brandproduct: { id: -1 },
  });

  const [prprData, setPrprData] = useState([]);

  const [productForm, setProductForm] = useState({});
  const [brandproductForm, setBrandproductForm] = useState({});
  const [stockForm, setStockForm] = useState({});

  const [errors, setErrors] = useState([{ fields: [], message: '' }]);

  const formatSelectItem = (value, label) => ({ value, label });

  function handleChange(setStateHandler, { name, value }) {
    setStateHandler(old => ({ ...old, [name]: value }));
    console.log(name, value);
    console.log(brandproductForm, productForm, stockForm);
  }

  // função que leva em conta tanto os dados do form quanto do select.
  // dava pra juntar tudo num state só? dava.
  function postForm(endpoint, formData, selectorData) {
    if (selectorData.id >= 0) return { data: selectorData };
    return api.post(endpoint, { ...formData, ...selectorData, id: undefined });
  }

  async function handleSubmit() {
    /* post sequence:
    
    1. /products; PRODUCT STUFF + name (save ID)
    2. /brands; name (save ID)
    3. /brandproducts; BP STUFF + saved IDs, (save ID as well)
    4. /stocks; STOCK STUFF + BP id
    5. (for each entry) /providerproducts; entry + bp.id
    */

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
        for (const item of prprData) {
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
      .catch(err => setErrors(formatErrorsSingleObject(err.response.data)));
  }

  const isProductFormDisabled = bpData.product.id >= 0;
  const isBPFormDisabled = bpData.brandproduct.id >= 0;

  return (
    <div className="tela">
      <Header>Novo Produto</Header>
      <BPSelector onChange={setBpData} />
      <fieldset>
        PRODUCT STUFF
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
              onChange={sel => handleChange(setProductForm, { name: 'unity_id', value: sel.value })}
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
      </fieldset>
      <fieldset onChangeCapture={e => handleChange(setBrandproductForm, e.target)}>
        BP STUFF
        <>
          <TextBox
            required
            name="code"
            error={errors.code}
            disabled={isBPFormDisabled}
            value={bpData.brandproduct.code}
            label="Código de Barras"
          />
          <TextBox
            required
            name="price"
            error={errors.price}
            disabled={isBPFormDisabled}
            value={bpData.brandproduct.price}
            label="Preço"
          />
        </>
      </fieldset>
      <fieldset onChangeCapture={e => handleChange(setStockForm, e.target)}>
        STOCK STUFF <i>(requires brandproduct)</i>
        <TextBox
          required
          error={errors.current_qty}
          name="current_qty"
          label="qtd. atual estoque"
        />
        <TextBox required error={errors.min_qty} name="min_qty" label="qtd. mínima estoque" />
        <TextBox
          required
          error={errors.initial_qty}
          name="initial_qty"
          label="qtd. inicial em estoque"
        />
      </fieldset>
      PROVIDER STUFF <i>(requires brandproduct)</i>
      <ProviderSelector onChange={setPrprData} brandproduct_id={bpData.brandproduct.id} />
      <br />
      <span>brandproduct errors: {errors.brandproduct_id}</span>
      <span>providerproduct errors: {errors.provider_id}</span>
      <Button onClick={handleSubmit}>POST</Button>
      <pre>
        POST DATA: <br />
        {'product form: ' + str(productForm) + '\n'}
        {'bp form: ' + str(brandproductForm) + '\n'}
        {'stock form: ' + str(stockForm) + '\n'}
        {'prpr selector: ' + str(prprData) + '\n'}
      </pre>
    </div>
  );
}
