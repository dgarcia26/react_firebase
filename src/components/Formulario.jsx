import React, {useState} from 'react'
//import {db} from '../firebase';
//import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [celular, setCelular] = useState('')
    const [email, setEmail] = useState('')
    const [cargo, setCargo] = useState('')
    const [despacho, setDespacho] = useState('')
    const [solicitud, setSolicitud] = useState('')
    const [listaFrutas, setListaFrutas] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')

    const guardarTiquet = async (e) => {
        e.preventDefault()

        try{
           const imageUrl = await obtenerImagen();
           //console.log(imageUrl)
            const data = await addDoc(collection(db, 'Tiquet'),{
                nombrePersona:nombre,
                apellidoPersona: apellido,
                celularPersona: celular,
                emailPersona: email,
                cargoPersona: cargo,
                despachoPersona: despacho,
                solicitudPersona: solicitud,
                //agregar mas campo
                imageUrl
            })
            setlistaTiquet([
                ...listaTiquet,
                {nombrePersona:nombre, apellidoPersona: apellido, celularPersona: celular, emailPersona: email, cargoPersona: cargo, despachoPersona: despacho,
                    solicitudPersona: solicitud, id:data.id, imageUrl}
            ])

            setNombre('')
            setApellido('')
            setCelular('')
            setEmail('')
            setCargo('')
            setDespacho('')
            setSolicitud('')

        }catch(error){
            console.log(error)
        }
    }

    const editarTiquet = async (e) => {
        e.preventDefault()
        try{
            const imageUrl2 = await obtenerImagen();
            const docRef = doc(db, 'Tiquet', id);
            await updateDoc(docRef, {
                
                nombrePersona:nombre,
                apellidoPersona: apellido,
                celularPersona: celular,
                emailPersona: email,
                cargoPersona: cargo,
                despachoPersona: despacho,
                solicitudPersona: solicitud,
                imageUrl2
                
            })
            

            const nuevoArray = listaTiquet.map(
                item => item.id === id ? {id: id, nombrePersona:nombre, apellidoPersona: apellido, celularPersona: celular, emailPersona: email, cargoPersona: cargo, despachoPersona: despacho,
                    solicitudPersona: solicitud, imageUrl2
                //mas iten
                } : item
            )
            
            setlistaTiquet(nuevoArray)
            setNombre('')
            setApellido('')
            setCelular('')
            setEmail('')
            setCargo('')
            setDespacho('')
            setSolicitud('')
            setId('')
            setModoEdicion(false)

        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'>CRUD WEB 2</h1>
        <hr/>
        <div className="row">
            <div className="col-8">
                <h4 className="text-center">Listado de Frutas</h4>
                <ul className="list-group">
                
            </ul>
            </div>

                

                
        </div>
    </div>
  )
}

export default Formulario