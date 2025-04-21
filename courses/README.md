> .[!IMPORTANT].
> Revisar inserts nuevos para la base de datos en PostgreSQL

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Tabla de datos para PostgreSQL

INSERT INTO course (title, price, category, description, "imageUrl")
VALUES 
('Introducción a React', 99, 'Programación', 'Este curso está diseñado para desarrolladores que desean dominar React, la biblioteca de JavaScript más popular para la creación de interfaces de usuario dinámicas.<br><br>Aprenderás desde los conceptos básicos hasta cómo manejar el estado y el ciclo de vida de los componentes, creando aplicaciones eficientes y bien estructuradas.<br><br><strong>Objetivos:</strong><br>- Comprender los fundamentos de React y cómo integrarlo en proyectos web.<br>- Aprender a crear componentes reutilizables y gestionar el estado de manera efectiva.<br>- Dominar el uso de hooks como <code>useState</code> y <code>useEffect</code>.<br>- Implementar enrutamiento con React Router y gestionar el flujo de datos.<br><br><strong>¿A quién está dirigido?</strong><br>Este curso es ideal para desarrolladores front-end con conocimientos básicos de JavaScript que buscan ampliar sus habilidades y crear aplicaciones más dinámicas y reactivas.<br><br><strong>Requisitos previos:</strong><br>Conocimiento básico de HTML, CSS y JavaScript.', 'http://localhost:3002/images/intro-react.jpg');
('Diseño UX/UI Avanzado', 149.99, 'Diseño', 'Este curso te llevará más allá de los fundamentos del diseño UX/UI, permitiéndote perfeccionar tus habilidades para diseñar interfaces de usuario funcionales, atractivas y centradas en la experiencia del usuario.<br><br><strong>Objetivos:</strong><br>- Profundizar en la investigación del usuario para diseñar experiencias centradas en sus necesidades.<br>- Desarrollar prototipos de alta fidelidad utilizando herramientas como Figma o Sketch.<br>- Mejorar la interacción usuario-producto mediante microinteracciones y flujos de usuario optimizados.<br>- Ejecutar pruebas de usabilidad para validar diseños y mejorar iterativamente.<br><br><strong>¿A quién está dirigido?</strong><br>Diseñadores web, gráficos, product managers, o cualquier profesional interesado en mejorar la interacción y experiencia del usuario en productos digitales.<br><br><strong>Requisitos previos:</strong><br>Conocimientos básicos de UX/UI y manejo de herramientas de diseño.', 'http://localhost:3002/images/Diseno-UXUI.jpg');
('Marketing Digital', 79.99, 'Marketing', 'El curso de Marketing Digital te ayudará a comprender las estrategias más efectivas para posicionar tu negocio en línea. Desde SEO hasta campañas pagadas, este curso cubre todo lo que necesitas para maximizar tu presencia digital y atraer clientes de manera eficiente.<br><br><strong>Objetivos:</strong><br>- Entender las bases del marketing digital y cómo aplicarlas a negocios online.<br>- Crear estrategias de contenido optimizadas para SEO.<br>- Aprender a ejecutar campañas pagadas en Google Ads y redes sociales.<br>- Medir el éxito de tus campañas mediante herramientas de analítica digital.<br><br><strong>¿A quién está dirigido?</strong><br>Emprendedores, marketers, y profesionales que deseen dominar las herramientas y estrategias digitales para hacer crecer su negocio en línea.<br><br><strong>Requisitos previos:</strong><br>Ninguno, aunque se recomienda tener una idea básica del entorno digital.', 'http://localhost:3002/images/marketing-digital.png'),
('Fotografía Profesional', 129.99, 'Fotografía', 'Este curso de fotografía profesional te guiará a través de todo lo que necesitas saber para capturar imágenes impactantes. Desde el manejo de la cámara hasta la edición avanzada, este curso está diseñado para que puedas elevar tus habilidades y crear un portafolio profesional.<br><br><strong>Objetivos:</strong><br>- Entender los conceptos básicos de la exposición, apertura y velocidad de obturación.<br>- Aprender técnicas de composición avanzadas para fotografía artística y comercial.<br>- Dominar el uso de la iluminación natural y artificial.<br>- Editar fotos profesionalmente utilizando software como Adobe Lightroom o Photoshop.<br><br><strong>¿A quién está dirigido?</strong><br>Fotógrafos aficionados y profesionales que buscan perfeccionar sus habilidades y crear un portafolio de nivel avanzado.<br><br><strong>Requisitos previos:</strong><br>Cámara DSLR o mirrorless (preferiblemente), y un software de edición de fotos.', 'http://localhost:3002/images/curso-fotografia.jpg'),
('Cocina Gourmet', 89.99, 'Gastronomía', 'En este curso de cocina gourmet, te enseñaremos a preparar platos de alta cocina utilizando técnicas de chefs de renombre. Aprenderás desde la selección de ingredientes premium hasta el emplatado, permitiéndote crear experiencias culinarias inolvidables.<br><br><strong>Objetivos:</strong><br>- Aprender técnicas avanzadas de cocina como el sous-vide, confitado y emulsionados.<br>- Conocer la importancia de los ingredientes de temporada y su maridaje.<br>- Crear platos de presentación impecable con emplatados profesionales.<br>- Descubrir secretos culinarios que harán que tus platos destaquen.<br><br><strong>¿A quién está dirigido?</strong><br>Aficionados a la cocina, chefs en formación y cualquier persona que desee impresionar en la cocina con platos de alta calidad.<br><br><strong>Requisitos previos:</strong><br>Ganas de aprender y una cocina equipada para realizar las técnicas enseñadas.', 'http://localhost:3002/images/cocina.jpg'),
('Python para Data Science', 119.99, 'Programación', 'Este curso de Python para Data Science te llevará de cero a experto en la manipulación y análisis de datos. Aprenderás cómo usar Python para crear modelos de machine learning, visualizar datos y aplicar técnicas de análisis avanzadas en conjuntos de datos reales.<br><br><strong>Objetivos:</strong><br>- Aprender a manejar y limpiar datos con librerías como Pandas y NumPy.<br>- Implementar modelos de machine learning utilizando Scikit-learn.<br>- Visualizar datos de manera efectiva con Matplotlib y Seaborn.<br>- Desarrollar proyectos de análisis de datos desde cero.<br><br><strong>¿A quién está dirigido?</strong><br>Científicos de datos, analistas, ingenieros de software, y cualquier persona interesada en el análisis y modelado de datos.<br><br><strong>Requisitos previos:</strong><br>Conocimiento básico de programación, idealmente en Python.', 'http://localhost:3002/images/python-data.jpg'),
('Ilustración Digital', 69.99, 'Diseño', 'En este curso de ilustración digital, aprenderás a utilizar herramientas como Procreate, Adobe Illustrator y Photoshop para crear arte digital impactante. Desde bocetos iniciales hasta la ilustración completa, este curso te enseñará técnicas profesionales para llevar tus ideas a la realidad.<br><br><strong>Objetivos:</strong><br>- Conocer las herramientas digitales más utilizadas en la ilustración profesional.<br>- Dominar técnicas avanzadas de dibujo y pintura digital.<br>- Aprender a crear personajes, fondos y escenas completas.<br>- Crear un portafolio digital listo para ser compartido con clientes o estudios.<br><br><strong>¿A quién está dirigido?</strong><br>Ilustradores, diseñadores gráficos, y artistas que quieran dar el salto al arte digital.<br><br><strong>Requisitos previos:</strong><br>Ninguno, pero se recomienda tener una tableta gráfica.', 'http://localhost:3002/images/ilustracion-digital.png'),
('SEO Avanzado', 159.99, 'Marketing', 'Este curso de SEO avanzado está diseñado para aquellos que ya tienen un conocimiento básico de SEO y quieren llevar sus habilidades al siguiente nivel. Aprenderás técnicas avanzadas para optimizar sitios web y posicionarlos en los primeros lugares de Google.<br><br><strong>Objetivos:</strong><br>- Aprender estrategias avanzadas de SEO on-page y off-page.<br>- Dominar el análisis de palabras clave de alta conversión.<br>- Implementar estrategias de link building efectivas.<br>- Medir el éxito de tus campañas de SEO con herramientas como Google Analytics y Search Console.<br><br><strong>¿A quién está dirigido?</strong><br>Profesionales de marketing digital, desarrolladores web, y emprendedores que deseen mejorar la visibilidad de su sitio web.<br><br><strong>Requisitos previos:</strong><br>Conocimiento básico de SEO.', 'http://localhost:3002/images/seo-avanzado.png'),
('Desarrollo de Aplicaciones Móviles', 139.99, 'Programación', 'En este curso aprenderás a desarrollar aplicaciones móviles nativas para iOS y Android. Te guiará desde los fundamentos hasta el despliegue de aplicaciones completamente funcionales en las tiendas de aplicaciones.<br><br><strong>Objetivos:</strong><br>- Comprender los principios básicos del desarrollo móvil para iOS y Android.<br>- Crear interfaces de usuario nativas utilizando Swift para iOS y Kotlin para Android.<br>- Integrar bases de datos y servicios web en aplicaciones móviles.<br>- Publicar y gestionar aplicaciones en App Store y Google Play.<br><br><strong>¿A quién está dirigido?</strong><br>Desarrolladores con conocimientos básicos en programación que deseen especializarse en el desarrollo móvil.<br><br><strong>Requisitos previos:</strong><br>Conocimientos básicos de programación, preferiblemente en JavaScript o un lenguaje orientado a objetos.', 'http://localhost:3002/images/desarrollo-app.png'),
('Edición de Video Profesional', 109.99, 'Diseño', 'Este curso te enseñará a editar videos de manera profesional, utilizando software de edición líder en la industria como Adobe Premiere Pro y Final Cut Pro. Aprenderás a editar películas, documentales, comerciales y mucho más.<br><br><strong>Objetivos:</strong><br>- Dominar el uso de las herramientas de edición profesional.<br>- Aprender técnicas de edición narrativa para contar historias visuales impactantes.<br>- Ajustar el color y el sonido de manera profesional.<br>- Exportar proyectos listos para cine, televisión o plataformas en línea.<br><br><strong>¿A quién está dirigido?</strong><br>Editores de video, cineastas, y creadores de contenido que deseen mejorar sus habilidades de postproducción.<br><br><strong>Requisitos previos:</strong><br>Acceso a un software de edición de video profesional.', 'http://localhost:3002/images/edicion-video.png');

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

