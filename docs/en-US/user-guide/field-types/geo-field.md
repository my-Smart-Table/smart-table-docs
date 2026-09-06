# Geolocation Field

The Geolocation field stores geographic information in a **structured** way: it can hold Chinese administrative divisions (province/city/district), countries/regions, a detailed address, or precise latitude/longitude coordinates, and supports picking a point directly on a map. Its value is stored as a structured JSON object (`GeoValue`) rather than plain text, which makes it easy to filter, aggregate, and export by level later.

## Core Features

- **Seven address formats**: Province, Province + City, Province / City / District, Province / City / District + Detail, Country / Region, Lat-Lng, Map Picker.
- **Cascading selection**: Chinese administrative divisions (province/city/district) are selected via a multi-column cascading panel with a keyword search on top.
- **Address auto-recognition**: paste a full address into the "detail" box and the system parses out the province/city/district automatically.
- **Map picking**: integrated with Tianditu; search and click a point on a map popup to obtain coordinates automatically, or enter lat-lng manually.
- **Multi-language**: the display language of geographic data (Chinese / English) follows the interface language in real time; the field no longer has a separate language option.
- **Inline table editing**: double-click a cell in the table view to edit inline; cascading formats (province/city/district, country/region) auto-commit when the last level is selected, while lat-lng and map picker provide "Cancel / Confirm" buttons.

## Configuring the Address Format

When creating or editing a Geolocation field, choose an **Address format** in the field settings. The mapping between formats and stored fields is:

| Address format | Description | Stored fields (`GeoValue`) |
| --- | --- | --- |
| Province | Select province-level only | `province` |
| Province + City | Province and city (two levels) | `province`, `city` |
| Province / City / District | Province / city / district down to the district level (**default format**) | `province`, `city`, `district` |
| Province / City / District + Detail | Adds a detailed street/door number on top of the three levels | `province`, `city`, `district`, `detail` |
| Country / Region | Select country/region grouped by continent | `region`, `country` |
| Lat-Lng | Enter longitude/latitude coordinates directly | `lng`, `lat` |
| Map Picker | Pick a point on the map to get coordinates | `lng`, `lat`, `address` |

> When not explicitly configured, the default is "Province / City / District".

## How to use each format

### 1. Province / Province + City / Province / City / District (cascading)

Click the field to open a multi-column cascading panel and select province, city, district in turn (for the "Province / City / District" format). A search box at the top lets you locate entries quickly by keyword.

- When **editing inside a table cell**, selecting the last level auto-commits.
- Clicking outside the panel cancels the edit.

### 2. Province / City / District + Detail

On top of the cascading selection, a "detail address" input is shown below:

- Enter supplementary information such as street, door number, or building manually.
- **Auto-recognition**: paste a full address (e.g., `广东省深圳市南山区科技园路 1 号`) and the system parses out the province/city/district, fills them back into the cascading boxes, puts the remainder into the detail box, and shows a "recognized" hint after the input.

### 3. Country / Region

Countries/regions are listed grouped by continent, with keyword search support. Selecting one records `region` (continent/area) and `country`.

### 4. Lat-Lng

Two inputs accept longitude (`Lng`) and latitude (`Lat`):

- Pasting `lng, lat` text (e.g., `113.53, 22.38`) is split and filled automatically.
- You can also click "Pick on map" to select a point on the map and fill the coordinates back.
- Longitude is roughly `-180 ~ 180`, latitude roughly `-90 ~ 90`.

### 5. Map Picker

Click the field to open a map popup (based on Tianditu):

- Search a place name in the search box, choose from the result list, and the map centers on that location.
- Click a point directly on the map to obtain its lat-lng automatically.
- The map area of the popup is enlarged and the result list is narrowed, so you can see both the map and results at once.
- A Tianditu key (`TIANDITU_KEY`) must be configured on the server; when it is not, the map is unavailable and you can fall back to the "Lat-Lng" format for manual entry.

## Multi-language

The language of geographic data (administrative division names, country/region names, map UI text) is driven by the **interface language**:

- After switching the interface to "English", the province/city/district and country/region lists display in English, and the map UI also switches to English, updating in real time with the language.
- The field itself no longer provides a separate language option (removed in an earlier version).
- The backend returns the matching language data based on the `Accept-Language` header / `lang` parameter:
  - Province/city/district English data comes from `en-location.json`;
  - Country/region English data comes from `en-region-location.json`.

> Note: in the province/city/district English data, provinces and cities use English names (well-known areas use conventional translations such as `Tibet`, `Inner Mongolia`, and `Shaanxi` to distinguish it from `Shanxi`), while districts/counties use pinyin. To use a specific official translation for a region, adjust the server-side data.

## Editing in the table view

- Double-click a geolocation cell to open the edit popup (the popup overlays the cell; clicking the map dialog will not pass through to the table).
- Cascading formats (province/city/district, country/region) auto-commit when the last level is selected; clicking outside the popup cancels.
- Lat-lng, map picker, and province/city/district + detail formats show "Cancel / Confirm" buttons at the bottom.
- The edit result is written to the data source as a structured object and **persisted**; the latest value is kept after a page refresh.

## Data structure (GeoValue)

A geolocation field is stored as a JSON object. Key fields:

| Field | Meaning | Applicable format |
| --- | --- | --- |
| `province` | Province | Province/City/District series |
| `city` | City | Province + City and above |
| `district` | District/County | Province / City / District and above |
| `detail` | Detailed address | Province / City / District + Detail |
| `region` | Continent/Area | Country / Region |
| `country` | Country/Region | Country / Region |
| `lng` | Longitude | Lat-Lng, Map Picker |
| `lat` | Latitude | Lat-Lng, Map Picker |
| `address` | Generic address text | Map Picker |

Example (Province / City / District + Detail):

```json
{
  "province": "广东省",
  "city": "深圳市",
  "district": "南山区",
  "detail": "科技园路 1 号"
}
```

Example (Map Picker):

```json
{
  "lng": 113.53,
  "lat": 22.38,
  "address": "广东省深圳市南山区"
}
```

## Import and export

- **Import**: a "province city district" string or a full address text can be parsed into a structured `GeoValue` (per the current field format).
- **Export**: output as readable text per the selected format (e.g., `广东省 / 深圳市 / 南山区`), or keep the original JSON structure.

## Related links

- [Field Types Overview](/en-US/user-guide/field-types.html)
- [Field Type Conversion Rules](/en-US/user-guide/field-types/field-type-conversion.html)
- [Table Operations](/en-US/user-guide/table-operations.html)
