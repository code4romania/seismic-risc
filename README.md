# Seismic Risc

[![Datree](https://s3.amazonaws.com/catalog.static.datree.io/datree-badge-20px.svg)](https://datree.io/?src=badge) [![GitHub contributors](https://img.shields.io/github/contributors/code4romania/seismic-risc.svg)](https://github.com/code4romania/seismic-risc/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/code4romania/seismic-risc.svg)](https://github.com/code4romania/seismic-risc/commits/master) [![License: MPL 2.0](https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->

<!-- display the social media buttons in your README -->

[![code for romania twitter][1.1]][1]
[![code for romania facebook][2.1]][2]

<!-- links to social media icons -->
<!-- no need to change these -->

<!-- icons with padding -->

[1.1]: http://i.imgur.com/tXSoThF.png "twitter icon with padding"
[2.1]: http://i.imgur.com/P3YfQoD.png "facebook icon with padding"
[1]: https://twitter.com/Code4Romania
[2]: https://www.facebook.com/code4romania/

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->

Un cutremur în București nu este o situație ipotetică. Este o certitudine că acest lucru se va întâmpla. În acest context, la mai bine de 40 de ani de la cutremurul din 1977, memoria colectivă a ascuns în profunzime amintirile acelui dezastru în încercarea de a-și înnăbuși teama. Dar realitatea este că, patru decenii mai târziu, Bucureștiul, la fel ca restul orașelor cu risc seismic ridicat, nu ar face față unui asemenea eveniment, iar pierderile de vieți omenești ar fi uriașe. [Exercițiul Seism 2018](https://www.news.ro/social/exercitiul-seism-2018-cel-mai-recent-bilant-al-cutremurului-simulat-indica-peste-3-900-de-morti-peste-7-000-de-raniti-si-peste-2-300-de-persoane-disparute-1922405315222018102018579831), derulat de DSU arată că cel puţin 4.587 persoane şi-ar pierde viaţa, iar 8.585 ar fost rănite, 6 spitale vor fi distruse, 23 de unităţi spitaliceşti distruse parţial, iar 9 avariate, dar funcţionale O estimare, am spune noi, destul de optimistă.

Ce putem face pentru a deveni mai puțin vulnerabili? Să știm totul despre oraș, despre clădirile în care locuim astfel încât să putem cere consolidarea lor. Seismic Risc nu este doar "un nou site de informare", ci o platformă care colectează și validează apoi cu experți date despre clădirile din România, la nivel national, ajută asociațiile de proprietari să își consolideze clădirile, te ține la curent cu legislația și ți-o explică și are grijă să ai la îndemână informații utile la orice moment.

Let's save lives together.

- [Seismic Risc](#seismic-risc)
  - [Contributing](#contributing)
  - [Built With](#built-with)
    - [Programming languages](#programming-languages)
    - [Frameworks](#frameworks)
    - [Package managers](#package-managers)
    - [Database technology & provider](#database-technology--provider)
  - [Getting started](#getting-started)
    - [Pre-requisites](#pre-requisites)
    - [Initial set-up](#initial-set-up)
    - [Starting the project](#starting-the-project)
    - [Development](#development)
  - [Testing](#testing)
  - [Production](#production)
  - [Client Deployment](#client-deployment)
  - [Feedback](#feedback)
  - [License](#license)
  - [About Code4Ro](#about-code4ro)

## Contributing

If you would like to contribute to one of our repositories, first identify the scale of what you would like to contribute. If it is small (grammar/spelling or a bug fix) feel free to start working on a fix. If you are submitting a feature or substantial code contribution, please discuss it with the team and ensure it follows the product roadmap.

Our collaboration model [is described here](.github/CONTRIBUTING.MD).

We don't have a specific set of coding guidelines, so just follow the way the code was written until now, if in doubt, you can use [Google's style guide](http://google.github.io/styleguide/pyguide.html).

## Built With

### Programming languages

[Python 3](https://www.python.org)
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Frameworks

API: [Django](https://www.djangoproject.com)
Client: [React](https://reactjs.org/)

### Package managers

API: [pip](https://pypi.org/)
Client: [npm](https://www.npmjs.com/)

### Code styling

API: [Black](https://black.readthedocs.io/en/stable/)
Client: [Prettier](https://prettier.io/) [ESLint](https://eslint.org/) + [Airbnb style guide](https://github.com/airbnb/javascript)

Add the following option to user settings in VS Code if ESlint fails to load Prettier plugin.

```json
{
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ]
}
```

### Database technology & provider

[PostgreSQL](https://www.postgresql.org)

## Getting started

Risc Seismic API is a Django application, built on top of Python 3.7+ with a PostgreSQL database, while the Client is a React single page application.

### Pre-requisites

In order to run the project locally, you need to have [Docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/overview/) installed.

You can install the above mentioned packages manually or you can use our helper commands.

On `Ubuntu 18.04+` run:

```bash
make install-docker-ubuntu
```

On `MacOS` run:

```bash
make install-docker-osx
```

On other platforms please follow the instructions described here:

- <https://docs.docker.com/install/>
- <https://docs.docker.com/compose/install/>

The versions the Makefile was tested with are:

```bash
$ docker --version
Docker version 19.03.5, build 633a0ea
$ docker-compose --version
docker-compose version 1.24.1, build 4667896b
```

### Initial set-up

Initialise the database and development fixtures:

```bash
make init-env
```

### Starting the project

First check the `.env` file created by the init command and see if there are any environment variables that you might need to provide or change. This file is used by `docker-compose` to pass the environment variables to the container it creates.

Get the project up and running:

```bash
docker-compose up
```

You should be able to access the local environment site and admin at the following URLs:

- <http://localhost:8000/api/v1/>
- <http://localhost:8000/admin/>

If you have problems starting the project, first check out the [FAQ](https://github.com/code4romania/seismic-risc/wiki/FAQ) and if that doesn't work, ask someone from the project's channel.
Maybe the issue you just had is worth adding to the [FAQ](https://github.com/code4romania/seismic-risc/wiki/FAQ), wouldn't it?

To work on running containers that were started using `docker-compose up`, open another terminal and:

```bash
cd path/to/repo
docker-compose exec api bash
# or
docker-compose exec client bash
```

In order to see all available commands run:

```bash
make
```

### Development

When creating new models in Django, in order to make sure they are generated in a clean environment, it is recommended to generate the migration files using the `make` command:

```bash
make migrations
```

When you need to add/remove requirements or restrict the version of a requirement, edit the `requirements.in` (prod) and the `requirements-dev.in` (dev) files accordingly. After doing this run:

```bash
make update-requirements
```

This will create a clean environment where is uses the [pip-tools](https://github.com/jazzband/pip-tools/) library to compile a the corresponding `requirements.txt` files with the versions of the packages pinned. This is important as it guarantees that every environment this service runs in, has the same dependencies installed and minimizes the risk of `works on my machine`.

## Testing

Local development testing:

```bash
cd path/to/repo
docker-compose exec api bash
root@3c5df91778ad:/code# pytest
```

Pipeline testing:

```bash
make test
```

## Production

In order to get the container ready for production use we need to first build it:

```bash
$ docker build -t seismic-risc:latest ./api
```

Use the `prod.env.dist` template file and create a `prod.env` file with the correct environment variables and run like so:

```bash
$ docker run --env-file prod.env -p HOST_PORT:GUNICORN_PORT seismic-risc:latest
```

Or, you can provide all the environment variables at runtime:

```bash
$ docker run -e DJANGO_CONFIGURATION=Prod -e DJANGO_SECRET_KEY= -e DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/NAME -e GUNICORN_PORT=5000 -e GUNICORN_WORKERS=2 -p HOST_PORT:GUNICORN_PORT seismic-risc:latest
```

After testing the container runs properly, tag and upload the image to Docker hub:

```bash
docker tag seismic-risc:latest code4romania/seismic-risc:latest
docker push code4romania/seismic-risc:latest
```

## Client Deployment

- Change directory to `./client`
- Build the solution `npm install`
- Start a development server `npm start`
- Run the tests `npm test`
- Build the solution `npm run build`

## Feedback

- Request a new feature on GitHub.
- Vote for popular feature requests.
- File a bug in GitHub Issues.
- Email us with other feedback contact@code4.ro

## License

This project is licensed under the MPL 2.0 License - see the [LICENSE](LICENSE) file for details

## About Code4Ro

Started in 2016, Code for Romania is a civic tech NGO, official member of the Code for All network. We have a community of over 500 volunteers (developers, ux/ui, communications, data scientists, graphic designers, devops, it security and more) who work pro-bono for developing digital solutions to solve social problems. #techforsocialgood. If you want to learn more details about our projects [visit our site](https://www.code4.ro/en/) or if you want to talk to one of our staff members, please e-mail us at contact@code4.ro.

Last, but not least, we rely on donations to ensure the infrastructure, logistics and management of our community that is widely spread across 11 timezones, coding for social change to make Romania and the world a better place. If you want to support us, [you can do it here](https://code4.ro/en/donate/).
