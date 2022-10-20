import React, {useState, useEffect} from 'react'
import {db} from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [celular, setCelular] = useState('')
    const [email, setEmail] = useState('')
    const [cargo, setCargo] = useState('')
    const [despacho, setDespacho] = useState('')
    const [solicitud, setSolicitud] = useState('')
    const [listaTiquet, setlistaTiquet] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    
    
    
    useEffect(()=>{
        const obtenerDatos = async () => {
            try{
                await onSnapshot(collection(db, "Tiquet"), (query)=>{
                    setlistaTiquet(query.docs.map((doc)=>({...doc.data(), id:doc.id})))
                })
            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos();
    }, [])

    const eliminar = async id =>{
        try{
            await deleteDoc(doc(db, 'Tiquet', id))
        }catch(error){
            console.log(error)
        }
    }

    const obtenerImagen = async() => {
        try{
           const res =  await fetch(`https://picsum.photos/200`)
           return res.url;
        }catch(error){
            console.log(error)
        }
    }

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

    const editar = item =>{
        setNombre(item.nombrePersona)
        setApellido(item.apellidoPersona)
        setCelular(item.celularPersona)
        setEmail(item.emailPersona)
        setCargo(item.cargoPersona)
        setDespacho(item.despachoPersona)
        setSolicitud(item.solicitudPersona)
        setId(item.id)
        setModoEdicion(true)
    }

    const cancelar = () =>{
        setModoEdicion(false)
        setNombre('')
        setApellido('')
        setCelular('')
        setEmail('')
        setCargo('')
        setDespacho('')
        setSolicitud('')
        setId('')
    }

    


  return (
    <div className='container mt-5'>
        <h1 className='text-center'>SOPORTE TECNICO</h1>
        <hr/>
        <div className="row">
            <div className="col-8">
                <h2 className="text-center">MESA DE AYUDA</h2>
                <h4 className="text-center">Solicitud de Tiquet</h4>
                <ul className="list-group">
                {
                     listaTiquet.map(item => (
                         <li className="list-group-item card" key={item.id}>
                            
                            
                            <div className="row">
                                <div className="col-4">
                                    <img className='imgUrl' src={item.imageUrl} alt="" />
                                </div>
                                <div className="col-8">
                                    <h6 className="lead">Nombre: {item.nombrePersona}</h6>
                                    <h6 className="lead">Apellido: {item.apellidoPersona}</h6>
                                    <h6 className="lead">Celular: {item.celularPersona}</h6>
                                    <h6 className="lead">Email: {item.emailPersona}</h6>
                                    <h6 className="lead">Cargo: {item.cargoPersona}</h6>
                                    <h6 className="lead">Despacho: {item.despachoPersona}</h6>
                                    <h6 className="lead">Solicitud: {item.solicitudPersona}</h6>
                                </div>
                            </div>  
                                                          
                             <button 
                             className="btn btn-danger btn-sm float-end mx-2"
                             onClick={()=>eliminar(item.id)}>Eliminar</button>
                             <button className="btn btn-warning btn-sm float-end"
                             onClick={()=>editar(item)}
                             >Editar</button>
                         </li>
                     ))        
                }
            </ul>
            </div>
            <div className="col-4">
            <h4 className="text-center">
                {
                    modoEdicion ? 'Editar Tiquet' : 'Agregar Tiquet'
                }
            </h4>
            <form onSubmit={modoEdicion ? editarTiquet : guardarTiquet}>
                <input type="text" 
                className="form-control mb-2" 
                placeholder='Ingrese Nombre'
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}/>
                 <input type="text" 
                className="form-control mb-2" 
                placeholder='Ingrese Apellido'
                value={apellido}
                onChange={(e)=>setApellido(e.target.value)}/>                
                <input type="text" 
                className="form-control mb-2" 
                placeholder='Ingrese Celular'
                value={celular}
                onChange={(e)=>setCelular(e.target.value)}/>
                <input type="text" 
                className="form-control mb-2" 
                placeholder='Ingrese Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" 
                className="form-control mb-2" 
                placeholder='Ingrese Cargo'
                value={cargo}
                onChange={(e)=>setCargo(e.target.value)}/>
                <input type="text" 
                className="form-control mb-2" 
                placeholder='Ingrese Despacho'
                value={despacho}
                onChange={(e)=>setDespacho(e.target.value)}/>
                <input type="text" 
                className="form-control mb-2" 
                placeholder='Ingrese Solicitud'
                value={solicitud}
                onChange={(e)=>setSolicitud(e.target.value)}/>
                {
                    modoEdicion ?
                    (
                        <>
                            <button
                            className='btn btn-warning btn-block'
                            on='submit'>Editar</button>
                            <button
                            className='btn btn-dark btn-block mx-2'
                            onClick={()=>cancelar()}>Cancelar</button>
                        </>
                    )
                    :                    
                    <button 
                    type='submit'
                    className='btn btn-primary btn-block'>
                    Agregar
                    </button>
                }
            </form>
        </div>    
        </div>
    </div>
  )
}

export default Formulario