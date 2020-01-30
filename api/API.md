# API

## Buildings

- `GET` `/api/v2/buildings/`

```json
[
    {
        "general_id": 75,
        "risk_category": "U1",
        ...
    },
    {
        "general_id": 74,
        "risk_category": "U3",
        ...
    },
	...
]
```

- `GET` `/api/v2/buildings/75/` 

```json
{
    "general_id": 75,
    "risk_category": "U1",
    "registration_number": 13,
    "examination_year": 2011,
    "certified_expert": "George Marian",
    "observations": "Observatie despre cladirea B",
    "lat": 44.34556,
    "lng": 26.206,
    "county": "Bucuresti",
    "address": "Grigore Cobalcescu 401",
    "post_code": "020244",
    "locality": "2",
    "year_built": 1901,
    "height_regime": "5000",
    "apartment_count": 2,
    "surface": 300.0,
    "cadastre_number": 222,
    "land_registry_number": "333",
    "administration_update": "2015-01-01",
    "admin_update": "2015-01-01",
    "status": 0,
    "created_on": "2019-11-23T11:58:07.385102Z"
}
```

- `PATCH` `/api/v2/buildings/75/` - update only some fields

```json
{
    "certified_expert": "Temistocle Popa"
}
```

- `DELETE` `/api/v2/buildings/75/`


## CMS - Pages

- `GET` `/api/v2/pages/`

```json
[
    {
        "id": 12,
        "title": "Page Title",
        "slug": "page1",
        "content": "<p>Conteeents</p>",
        "updated_on": "2019-12-14T10:14:54.781918Z",
        "publishing_date": null,
        "is_published": true,
        "category": null
    },
    ...
]
```

- `GET` `/api/v2/pages/page1/` 

```json
{
    "id": 12,
    "title": "Page Title",
    "slug": "page1",
    "content": "<p>Conteeents</p>",
    "updated_on": "2019-12-14T10:14:54.781918Z",
    "publishing_date": null,
    "is_published": true,
    "category": null
}
```

- `PATCH` `/api/v2/pages/page1/` - update only some fields

```json
{
    "title": "New Page Title"
}
```

- `DELETE` `/api/v2/pages/page1/`
