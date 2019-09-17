### Seismic Risc

[![GitHub contributors](https://img.shields.io/github/contributors/code4romania/seismic-risc.svg?style=for-the-badge)](https://github.com/code4romania/seismic-risc/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/code4romania/seismic-risc.svg?style=for-the-badge)](https://github.com/code4romania/seismic-risc/commits/master) [![License: MPL 2.0](https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg?style=for-the-badge)](https://opensource.org/licenses/MPL-2.0)

Un cutremur în București nu este o situație ipotetică. Este o certitudine că acest lucru se va întâmpla. În acest context, la mai bine de 40 de ani de la cutremurul din 1977, memoria colectivă a ascuns în profunzime amintirile acelui dezastru în încercarea de a-și înnăbuși teama. Dar realitatea este că, patru decenii mai târziu, Bucureștiul, la fel ca restul orașelor cu risc seismic ridicat, nu ar face față unui asemenea eveniment, iar pierderile de vieți omenești ar fi uriașe. Exercițiul Seism 2018, derulat de DSU arată că cel puţin 4.587 persoane şi-ar pierde viaţa, iar 8.585 ar fost rănite, 6 spitale vor fi distruse, 23 de unităţi spitaliceşti distruse parţial, iar 9 avariate, dar funcţionale O estimare, am spune noi, destul de optimistă.

Ce putem face pentru a deveni mai puțin vulnerabili? Să știm totul despre oraș, despre clădirile în care locuim și sa putem sa cerem consolidarea lor. Seismic risk nu este doar un nou site de informare, ci o platforma care colectează și validează apoi cu experti date despre clădirile din București și care va fi extins la nivel national, ajuta asociațiile de proprietari sa își consolideze clădirile, te tine la curent cu legislația și ți-o explica și are grija sa ai la îndemână informații utile la orice moment.

Let's save lives together.

## Contributing

This project is built by amazing volunteers and you can be one of them! Here's a list of ways in [which you can contribute to this project](.github/CONTRIBUTING.MD).

## Built With

### Programming languages

Python 3

### Database technology & provider

PostgreSQL

## Getting started
Risc Seismic is a Django application, built on top of Python 3.x with a PostgreSQL database.

1. Installation process

Create a virtual environment and activate it
```
virtualenv venv
source venv/bin/activate
```
Install the Python requirements
```
pip install -r requirements.txt
```

The application expects a Postgres database being set up. It is easy to do so using docker:

```
docker pull postgres

docker run --name postgres-risc -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=risc_db -p 5432:5432  postgres
```

Run the initial Django migrations

```
cd seismic_site
python3 manage.py migrate
```

Set up Django Admin default admin user
```
python3 manage.py createsuperuser
```

Populate the database with some play data
```
python3 manage.py loaddata buildings
```


## Feedback

* Request a new feature on GitHub.
* Vote for popular feature requests.
* File a bug in GitHub Issues.
* Email us with other feedback contact@code4.ro

## License 

This project is licensed under the MPL 2.0 License - see the [LICENSE](LICENSE) file for details

## About Code4Ro

Started in 2016, Code for Romania is a civic tech NGO, official member of the Code for All network. We have a community of over 500 volunteers (developers, ux/ui, communications, data scientists, graphic designers, devops, it security and more) who work pro-bono for developing digital solutions to solve social problems. #techforsocialgood. If you want to learn more details about our projects [visit our site](https://www.code4.ro/en/) or if you want to talk to one of our staff members, please e-mail us at contact@code4.ro.

Last, but not least, we rely on donations to ensure the infrastructure, logistics and management of our community that is widely spread across 11 timezones, coding for social change to make Romania and the world a better place. If you want to support us, [you can do it here](https://code4.ro/en/donate/).
