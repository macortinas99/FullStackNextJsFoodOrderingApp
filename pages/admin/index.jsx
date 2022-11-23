import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateStatus } from '../../redux/cartSlice'
import styles from '../../styles/Admin.module.css'

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products)
  const [orderList, setOrderList] = useState(orders)
  const [editOpen, setEditOpen] = useState(false)
  const [pizzaToEdit, setPizzaToEdit] = useState({})
  const [editedPizza, setEditedPizza] = useState({})
  const status = ['preparing', 'on the way', 'delivered']

  const [fileNeedsToBeSubmitted, setFileNeedsToBeSubmitted] = useState()

  // Edit variables
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [prices, setPrices] = useState([null])
  const [extraOptions, setExtraOptions] = useState([])
  const [extras, setExtras] = useState([])
  const [productId, setProductId] = useState()

  const handleExtraInput = e => {
    setExtras({ ...extras, [e.target.name]: e.target.value })
  }

  const handleExtra = (type, e) => {
    setExtraOptions(prev => [...prev, extras])
    console.log(extraOptions)
  }
  const changePrice = (e, index) => {
    const currentPrices = prices
    currentPrices[index] = e.target.value
    setPrices(currentPrices)
  }

  const handleFileSelection = e => {
    setFile(e.target.files[0])
    setFileNeedsToBeSubmitted(false)
  }

  const handleEditOpen = async id => {
    setProductId(id)
    const prevProduct = pizzaList.filter(pizza => pizza._id === id)
    setPizzaToEdit(prevProduct)
    setEditOpen(true)
  }

  const handleEdit = async id => {
    setTitle(pizzaToEdit[0].title)
    setDesc(pizzaToEdit[0].desc)
    setPrices(pizzaToEdit[0].prices)
    setFile(pizzaToEdit[0].img)

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'uploads')
    if (!file) {
      setFileNeedsToBeSubmitted(true)
    }

    try {
      if (!fileNeedsToBeSubmitted) {
        const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dlp8jxayl/image/upload', data)

        const { url } = uploadRes.data

        if (!title) {
          setTitle(pizzaToEdit[0].title)
        }
        if (!desc) {
          setDesc(pizzaToEdit[0].desc)
        }
        if (!prices) {
          setPrices(pizzaToEdit[0].prices)
        }
        if (!extraOptions) {
          setExtraOptions(pizzaToEdit[0].extraOptions)
        }

        let newEditedPizza = {
          title,
          desc,
          img: url,
          prices,
          extraOptions,
        }
        setEditOpen(false)
        const res = await axios.put(`http://localhost:3000/api/products/${productId}`, newEditedPizza)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async id => {
    try {
      const res = await axios.delete('http://localhost:3000/api/products/' + id)
      setPizzaList(pizzaList.filter(pizza => pizza._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const handleStatus = async id => {
    const item = orderList.filter(order => order._id === id)[0]
    const currentStatus = item.status

    try {
      const res = await axios.put('http://localhost:3000/api/orders/' + id, {
        status: currentStatus + 1,
      })
      setOrderList([res.data, ...orderList.filter(order => order._id !== id)])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map(product => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image src={product.img} width={50} height={50} objectFit='cover' alt='' />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button} onClick={() => handleEditOpen(product._id)}>
                    Edit
                  </button>

                  <button className={styles.button} onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map(order => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>{order.method === 0 ? <span>cash</span> : <span>paid</span>}</td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>Next Stage</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {editOpen && (
        <div className={styles.editContainer}>
          <div className={styles.wrapper}>
            <span onClick={() => setEditOpen(false)} className={styles.close}>
              X
            </span>
            <h1>Add a new Pizza</h1>
            <div className={styles.item}>
              <label className={styles.label}>Choose an image</label>
              <input type='file' onChange={e => handleFileSelection(e)} />
            </div>
            {fileNeedsToBeSubmitted && <span className={styles.error}>File must be submitted</span>}
            <div className={styles.item}>
              <label className={styles.label}>Title</label>
              <input className={styles.input} type='text' onChange={e => setTitle(e.target.value)} />
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Desc</label>
              <textarea rows={4} type='text' onChange={e => setDesc(e.target.value)} />
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Prices</label>
              <div className={styles.priceContainer}>
                <input className={`${styles.input} ${styles.inputSm}`} type='number' placeholder='Small' onChange={e => changePrice(e, 0)} />
                <input className={`${styles.input} ${styles.inputSm}`} type='number' placeholder='Medium' onChange={e => changePrice(e, 1)} />
                <input className={`${styles.input} ${styles.inputSm}`} type='number' placeholder='Large' onChange={e => changePrice(e, 2)} />
              </div>
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Extra</label>
              <div className={styles.extra}>
                <input className={`${styles.input} ${styles.inputSm}`} type='text' placeholder='Item' name='text' onChange={handleExtraInput} />
                <input className={`${styles.input} ${styles.inputSm}`} type='number' placeholder='Price' name='price' onChange={handleExtraInput} />
                <button className={styles.extraButton} onClick={handleExtra}>
                  Add
                </button>
              </div>
              <div className={styles.extraItems}>
                {extraOptions.map(option => (
                  <span key={option.text} className={styles.extraItem}>
                    {option.text}
                  </span>
                ))}
              </div>
            </div>
            <button className={styles.addButton} onClick={() => handleEdit(pizzaToEdit._id)}>
              Make Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async ctx => {
  const myCookie = ctx.req?.cookies || ''

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  const productRes = await axios.get('http://localhost:3000/api/products')
  const orderRes = await axios.get('http://localhost:3000/api/orders')

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  }
}

export default Index
