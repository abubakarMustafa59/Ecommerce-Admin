import React from 'react'
import List from '../../pages/list/List'
import Single from '../../pages/single/Single'
import New from '../../pages/new/New'
import { productInputs } from '../../formSource'
import Datatable from '../datatable/Datatable'

const Products = () => {
  return (
    <div>
        {/* <Datatable /> */}
        <List />
      {/* <List />
      <Single />
      <New inputs={productInputs} title="Add New Product" /> */}
    </div>
  )
}

export default Products
