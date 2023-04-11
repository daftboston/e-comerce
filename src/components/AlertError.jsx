import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertError({isVisible}) {

  const [show, setShow] = useState(isVisible);

  //Este useEffect permite actualizar en tiempo real el componente alerError, sin este el componente solo se actualizaria al recargar la pagina
  useEffect (()=> {
    setShow(isVisible)
  }, [isVisible])

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
         
        </div>
      </Alert>

      
    </>
  );
}

export default AlertError
