# InteWare Test
este proyecto tiene como finalidad desarraollar la UI lo mas parecida posible al diseño que presenta a continuación.

> #### Diseño de referencia
> ![diseño](https://res.cloudinary.com/miyoexcellent/image/upload/v1568635841/InterWare/interware_test_01_d9dnij.png)

Puede [ingresar aquí](https://miyo-excellent.github.io/InterWare/)  para ver el proyecto corriendo en producción

A continuación se presenta la estructura de carpetas.
*   docs: En esta carpeta se encuentran los archivos generados por webpack.

*   src: En esta carpeta se encuentran los archivos no compilados tanto cliente como servidor.
     *   actions: Aquí se encuentran las acciones para redux.
     *   api: Aquí se encuentran las funciones para realizar peticiones HTTP.
     *   assets: Aquí se encuentran los recursos  gráficos.
     *   components: Aquí se encuentran los componentes del cliente.
     *   reducers: Aquí  se almacenan los estados de las vistas.
     *   styles: Aquí  se almacenan los estilos globales, mixins, variables, etc.
     *   views: Aquí  se almacenan todas las vistas.
     *   actionsTypes.js: Aquí  se almacenan nombres de las acciones Redux.
     *   app.js:  Este archivo contiene todo el app cliente.
     *   config.js:  Aquí  se almacena la configuracion general del app cliente.
     *   index.html:  Es la plantilla base del html que se genera a partir del mismo en la carpeta docs.
     *   index.js:   Es el punto de entrada del app cliente.
     *   Router.js:   Es el controlador de rutas.
     *   server.js:   Es el app server.
     *   store.js:   Contiene toda la configuracion del Store para Redux.
     
*   webpack.config.js: Contiene toda la configuración de webpack.

* .eslint: Contiene toda la configuración de Eslint.

* .babelrc: Contiene toda la configuración de Babel.
