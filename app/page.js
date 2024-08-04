'use client'
import { database } from "@/firebase";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Box, Button, Modal, Stack, TextField, Typography, style } from "@mui/material";
import { collection, deleteDoc, getDoc, getDocs, query, setDoc, doc } from "firebase/firestore";
import  { Camera } from 'react-camera-pro'

export default function Home() {

  // add state management.
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  // camera
  const camera = useRef(null)
  const [camImage, setCamImage] = useState(null)

  // modal controlls
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // implement fetching details from the firebase.
  const updateInventory = async () => {
    const snapshot = query(collection(database, 'Inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({name: doc.id, ...doc.data() })
    })

    setInventory(inventoryList)
    console.log(inventoryList)

  }


  // Add and remove functionalities.
  const addItem = async (item) => {
    const docRef = doc(collection(database, 'Inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else{
      await setDoc(docRef, {quantity:1})
    }
    await updateInventory()
  }


  const removeItem = async (item) => {
    const docRef = doc(collection(database, 'Inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInventory()
  }

//   const takePhoto = () => {
// const img = camera.current;
// console.log('img',img) 
// setCamImage(img)
//   }
  useEffect(() => {
updateInventory()
  },[])
  
  return (
  <>
  <Box 
  width={'100vw'}
  height={'100vh'}
  display={'flex'}
  justifyContent={'center'}
  alignItems={'center'}
  flexDirection={'column'}
  gap={2}
  >
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby='modal-modal-title'
    aria-describedby='modal-modal-description'
    >
      <Box 
      position={'absolute'}
      top={'50%'}
      left={'50%'}
      width={400}
      bgcolor={'white'}
      border={'2px solid #000'}
      boxShadow={24}
      p={4}
      display='flex'
      flexDirection={'column'}
      gap={3}
      sx={{
      transform:'translate(-50%, -50%)'
      }}
      >
        <Typography id='modal-modal-title' variant="h6" component={'h2'} >Add Item</Typography>

        <Stack width={'100%'} direction={'row'} spacing={2}>
          <TextField 
          id="outlined-basic"
          label='Item'
          variant="outlined"
          fullWidth
          value={itemName}
          onChange={(e) => setItemName(e.target.value)} 
          />

          <Button variant="outlined"
          onClick={() => {
            addItem(itemName)
            setItemName('')
            handleClose()
          }}>Add</Button>
        </Stack>
      </Box>
    </Modal>

    <Button variant="contained" onClick={handleOpen}>Add New Item</Button>

    <Box border={'1px solid #333'}>
      <Box width={'800px'}
      height={'100px'}
      bgcolor={'#ADD8E6'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      >
        <Typography variant="h2" color={'#333'} textAlign={'center'}>Inventory Items</Typography>
      </Box>
      <Stack width={'800px'} height={'300px'} spacing={2} overflow={'auto'}>
        {inventory.map(({name, quantity}) => (
          <Box key={name}
          width={'100%'}
          minHeight={'150px'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          bgcolor={'#f0f0f0'}
          paddingX={5}>
            <Typography variant="'h3" color={'#333'} textAlign={'center'}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h3" color={'#333'} textAlign={'center'}>
              quantity: {quantity}
            </Typography>
             <Stack direction={'row'} spacing={2} > 
              <Button variant="contained" onClick={() => addItem(name)}>
              Add
            </Button>
            <Button variant="contained" onClick={() => removeItem(name)}>
              Remove
            </Button>
             </Stack>
          </Box>
        ))}
      </Stack>
    </Box>

    

  </Box>
  {/* <div>
      <Camera ref={camera}/>
     <button onClick={() => {takePhoto()}}>Take photo</button>
      <div>
      <img src={camImage} alt='Taken photo'/>
      </div>
    </div> */}
    </>
  );
}
