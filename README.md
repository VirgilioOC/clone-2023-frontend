## Proyecto Javascript - React/Vue

***Observaciones***

En el carrusel hay una imagen correspondiente al acceso a los pedidos de un cliente logueado en la página. El logueo de un cliente no corresponde a la etapa actual del proyecto, decidimos dejarla pero se trata de una funcionalidad no desarrollada.

### ***Deploy del proyecto***
- **[Deploy Vercel](https://digital-dynamos-react.vercel.app)**

### ***Librerias utizadas***

- **[React-Bootstrap](https://react-bootstrap.github.io/)**

- **[FontAwesomeIcons](https://fontawesome.com/)**

### ***Motivos de elección de React***
Priorizamos el uso y aprendizaje de React por sobre el de Vue ya que consideramos que React cuenta con una comunidad más grande y esto proveería mayor cantidad de fuentes de información de las que aprender. Además, al tener una mayor comunidad representa un puntapié inicial hacia las necesidades del mercado actual.

## ***Promoción***

### ***Autenticación de usuario***
Para autenticar usuarios almacenamos el token provisto por Laravel, al momento de loguear a un usuario, en el almacenamiento local del navegador.
Una vez ya almacenado, lo utilizamos en los headers de nuestras solicitudes y nos permite contar con los permisos necesarios para el correcto funcionamiento de las mismas.


### ***Mercado Pago FrontEnd***
Utilizando el componente CardPayment, provisto por MercadoPago, pudimos adaptar el servicio de pagos por tarjeta de la misma empresa.
En el mismo realizamos un POST hacia nuestro endpoint */process-payment* definido en el apartado BackEnd del proyecto.
Fue requisito la utilización de credenciales de prueba de MercadoPago y además progejimos nuestro endpoint, por lo que se envía el token de autenticación
en el header de la solicitud.


### ***Servicio Web***
Hicimos uso de un servicio web que provee valores de la cotización actual del dólar estadounidense contra el peso argentino. El mismo facilita el acceso a un número considerable de "dólares distintos", como el oficial o el blue, pero optamos por la utilización de este último. 

### ***Responsive***
Realizamos cambios en el estilizado de la página para conseguir adaptar el apartado visual a dispositios de diversos tamaños y resoluciones.

***Observaciones***

Se pidió corregir la forma de agregar productos al carrito debido a que no era la más cómoda y no se podía la de modificar la cantidad en el carrito. 
Luego de charlar sobre las correcciones se acordó agregar un botón para poder agregar mas items de uno que se encuentra en el carrito. Se charló sobre que, a partir de esto, el botón de eliminar del carrito eliminara ese item idependientemente de la cantidad, pero se determinó que no sería lo más práctico ya que si se tiene muchas unidades de determinado item y se quiere eliminar solo uno, agregar después el resto de unidades de nuevo se haría tedioso.

Se discutió como comisión como modificar la funcionalidad de Confirmar Pedido en el carrito de compras, ya que con la autenticación de usuario la funcionalidad desarrollada para la entrega anterior era obsoleta. Una opción era que al no estar logueado mostrara un mensaje de que requería un log in para poder realizar dicha accion, la otra opción era que si no se está logueado abriese el modal para iniciar sesión. Se optó por esta última opción para modificar la funcionalidad del botón Confirmar Pedido.