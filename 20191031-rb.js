let RBStr = `
{
    "name": "Test",
    "doc": "test garden design",
    "rules": [
        {
            "name": "B1",
            "if": [
                "here is north-area",
                "?x is blank",
                "?x is blank"
            ],
            "then": [
                "add ?x tree"
            ]
        },
        {
            "name": "B2",
            "if": [
                "here is south-area",
                "here is west-area",
                "?x is tree"
            ],
            "then": [
                "?x stone"
            ]
        }
    ]
}
`;
