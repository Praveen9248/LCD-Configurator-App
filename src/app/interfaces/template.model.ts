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
        "nextPage": null,
        "prevPage": "intermediate"
    }
}