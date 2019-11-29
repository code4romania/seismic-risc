# Seismic Risc

[![Datree](https://s3.amazonaws.com/catalog.static.datree.io/datree-badge-20px.svg)](https://datree.io/?src=badge) [![GitHub contributors](https://img.shields.io/github/contributors/code4romania/seismic-risc.svg)](https://github.com/code4romania/seismic-risc/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/code4romania/seismic-risc.svg)](https://github.com/code4romania/seismic-risc/commits/master) [![License: MPL 2.0](https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->

<!-- display the social media buttons in your README -->

[![code for romania twitter][1.1]][1]
[![code for romania facebook][2.1]][2]

<!-- links to social media icons -->
<!-- no need to change these -->

<!-- icons with padding -->

[1.1]: http://i.imgur.com/tXSoThF.png (twitter icon with padding)
[2.1]: http://i.imgur.com/P3YfQoD.png (facebook icon with padding)

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
    - [Framework](#framework)
    - [Database technology & provider](#database-technology--provider)
  - [Getting started](#getting-started)
    - [Installation process](#installation-process)
    - [Initial set-up](#initial-set-up)
    - [Starting the project](#starting-the-project)
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

### Framework

[Django](https://www.djangoproject.com)

### Database technology & provider

[PostgreSQL](https://www.postgresql.org)

## Getting started

Risc Seismic is a Django application, built on top of Python 3.x with a PostgreSQL database.

### Installation process

Create a virtual environment and activate it

```shell
virtualenv venv
```

```shell
# Linux/Mac:
source venv/bin/activate
```

```powershell
# Windows:
\path\to\env\Scripts\activate
```

Install the Python requirements

```shell
pip install -r requirements.txt
```

### Initial set-up

The application expects a Postgres database being set up. It is easy to do so using [docker](https://www.docker.com/products/developer-tools):

```shell
docker pull postgres
docker run -d --name postgres-risc -e POSTGRES_USER=seism -e POSTGRES_PASSWORD=seism -e POSTGRES_DB=risc_db -p 5432:5432  postgres
```

Run the initial Django migrations

```shell
cd seismic_site
python3 manage.py migrate
```

Set up Django Admin default admin user

```shell
python3 manage.py createsuperuser
```

Populate the database with some play data

```shell
python3 manage.py loaddata buildings
```

### Starting the project

```shell
cd seismic_site
python3 manage.py runserver
```

If you have problems starting the project, first check out the [FAQ](https://github.com/code4romania/seismic-risc/wiki/FAQ) and if that doesn't work, ask someone from the project's channel.
Maybe the issue you just had is worth adding to the [FAQ](https://github.com/code4romania/seismic-risc/wiki/FAQ), wouldn't it?

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
