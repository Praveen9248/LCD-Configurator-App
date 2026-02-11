export const NestedTemplate = {
    "home": {
        "nextPage": "intermediate",
        "prevPage": null
    },
    "intermediate": {
        "enabled": true,
        "nextPage": "result",
        "prevPage": "home"
    },
    "result": {
        "code": "R1000",
        "nextPage": null,
        "prevPage": "intermediate"
    }
}

export const ListTemplate = {
    "home": {
        "nextPage": "intermediate",
        "prevPage": null
    },
    "intermediate": {
        "enabled": false,
        "nextPage": "result",
        "prevPage": "home"
    },
    "result": {
        "code": "R0010",
        "nextPage": null,
        "prevPage": "intermediate"
    }
}