import React, { useContext, useState } from 'react';

// inport icons
import {RiWallet3Line, RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri'

//import headless ul
import {Menu} from '@headlessui/react'

//import house context
import { HouseContext } from './HouseContext';

const PriceRangeDropdown = () => {
  const {price, setPrice} = useContext(HouseContext)

  const prices = [
    {
      value: 'Price range (any) '
    },{
      value: '100000 - 130000'
    },{
      value: '130000 - 160000 '
    },{
      value: '160000 - 190000 '
    },{
      value: '190000 - 220000 '
    }
  ]
  console.log(prices)

  const [isOpen, setIsOpen] = useState(false)

  return(
    <Menu as= 'div' className=' dropdown relative' >
      <Menu.Button as='div' className=' dropdown-btn w-full text-left' onClick={() => setIsOpen(!isOpen)} >
        <RiWallet3Line className='dropdown-icon-primary'/>
        <div>
          <div className='text-[15px] font-medium leading-tight'>{price}</div>
          <div className=' text-[13px]'>Choose your price</div>
        </div>
          {
            isOpen ? (<RiArrowUpSLine className='dropdown-icon-secondary'/>
            ):(
              <RiArrowDownSLine className='dropdown-icon-secondary'/>
            )
          }
      </Menu.Button>
      <Menu.Items className='dropdown-menu'>
        {prices.map((price, index) => {
          return (
            <Menu.Item className= '  cursor-pointer hover:text-violet-700 transition' as='li' key={index}
            onClick={() => setPrice(price.value)} >
              {price.value}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
};

export default PriceRangeDropdown;
