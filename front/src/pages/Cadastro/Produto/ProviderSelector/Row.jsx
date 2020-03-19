import React from "react";
import formatPrice from 'utils/formatPrice';
import { queryObject } from 'utils/getProperty';

export default function Row({ provider_id, providers, cost_price }) {
  return (
    <tr>
      <td>{queryObject(providers, provider_id, 'name')}</td>
      <td>{formatPrice(cost_price)}</td>
      <td></td>
    </tr>
  );
}
