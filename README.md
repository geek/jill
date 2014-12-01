
Hapi.js API plugin for sensor data

* Requires mongodb *


### Endpoints

#### GET /boards

Return an array of board objects.  Returns all available boards in the database.

#### PUT /board/{boardId}

Create or update a board.  Expects the following payload:

```
{
    name,
    version,
    battery
}
```


#### GET /board/{boardId}

Retrieve the data for an individual board.


#### PUT /board/{boardId}/{addonId}

Create or update data for an addon.  Expects the following payload:

```
{
    type,
    name
}
```


#### GET /board/{boardId}/{addonId}

Retrieve all data for an addon


#### POST /board/{boardId}/{addonId}/reading

Create a reading for an addon.  Expects the following payload:

```
{
    type,
    value,
    time
}
```

#### POST /board/{boardId}/{addonId}/command

Create a command to send to an addon.  Expects the following payload:

```
{
    type,           // optional
    value
}
```



#### POST /log

Create a log message.  Expects the following payload:

```
{
    message,
    time,
    boardId,       // optional
}
```


#### GET /log/{logId}

Get a log message.


