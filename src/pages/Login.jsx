import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "/public/css/login-mobile.css";
import { login } from "../services/cards"
import "/public/css/login-tablet.css";
import "/public/css/login-desktop.css";

function Login() {
    const navigate = useNavigate();
    const [body, setBody] = useState({ number: null, pin: null })

    const seting = e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            let result = await login(body);

            sessionStorage.setItem("user", JSON.stringify(result))

            let msgErrors = document.querySelectorAll(".msg-error")

            if (Array.isArray(result)) {
                result.forEach(error => {
                    if (error.param === "number" && result.length === 1) {
                        msgErrors[0].innerText = error.msg
                        msgErrors[0].classList.add("invalid")
                        msgErrors[1].classList.remove("invalid")
                    } else if (error.param === "pin" && result.length === 1) {
                        msgErrors[1].innerText = error.msg
                        msgErrors[1].classList.add("invalid")
                        msgErrors[0].classList.remove("invalid")
                    } else if (error.param === "number") {
                        msgErrors[0].innerText = error.msg
                        msgErrors[0].classList.add("invalid")
                    } else if (error.param === "pin") {
                        msgErrors[1].innerText = error.msg
                        msgErrors[1].classList.add("invalid")
                    }
                })
            } else {
                msgErrors[0].classList.remove("invalid")
                msgErrors[1].classList.remove("invalid")
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    let eye = () => {
        let input = document.querySelector(".input-password")
        let eyeIcon = document.querySelector(".fa-eye-slash")
        let eyeIcon2 = document.querySelector(".fa-eye")
        if (input.type === "password") {
            input.type = "text"
            eyeIcon.classList.remove("fa-eye-slash")
            eyeIcon.classList.add("fa-eye")
        } else if (input.type === "text") {
            input.type = "password"
            eyeIcon2.classList.remove("fa-eye")
            eyeIcon2.classList.add("fa-eye-slash")
        }
    }
    
    return (
        <div className="login-container">
            <section className="section-login">
                <p>¡Hola! Te damos la bienvenida</p>
                <Link to="#">Conocé más sobre Online Banking</Link>
            </section>
            <form className="form-login" onSubmit={onSubmit}>
                <p className="first-p">Ingresá tus datos para operar</p>
                <div className="input-container">
                    <input type="text" name="number" placeholder="Tu número de tarjeta" onChange={seting} />
                </div>
                <p className='msg-error'></p>
                <div className="input-container">                                                                         
                    <input type="password" name="pin" className="input-password" placeholder="Tu pin" onChange={seting} /><i className="fa-solid fa-eye-slash" onClick={eye}></i>
                </div>
                <p className='msg-error'></p>
                <p className="second-p">No compartas los códigos que te enviamos por SMS o email, el Token de seguridad, los datos de tu tarjeta de coordenadas ni tus claves, <Link to="#">Conocé más consejos de seguridad</Link></p>
                <button className="button-login" type="submit">Ingresar</button>
                <div className="login-div">
                    <p className="login-p">Si no tenés u olvidaste tu clave y/o usuario</p>
                    <Link className="latest-a" to="#">Crear clave y usuario</Link>
                    <p className="login-p">Si sólo tenés clave</p>
                    <Link className="latest-a" to="#">Crear clave</Link>
                </div>
            </form>
        </div>
    )
}

export default Login