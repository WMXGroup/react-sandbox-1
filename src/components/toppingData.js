// Arbitrarily nested data
 const toppingOptions = [
  {
    name: "Pepperoni",
    id: 1,
    subOptions: [
      {
        name: "Spicy",
        id: 2,
        subOptions: []
      },
      {
        name: "Regular",
        id: 3,
        subOptions: []
      }
    ]
  },
  {
    name: "Chicken",
    id: 4,
    subOptions: [
      {
        name: "Buffalo",
        id: 5,
        subOptions: [
          {
            name: "Mild",
            id: 6,
            subOptions: [],
          },
          {
            name: "Hot",
            id: 7,
            subOptions: [
              {
                name: 'Jalapeño',
                id: 8,
                subOptions: []
              },
              {
                name: 'Cayenne',
                id: 9,
                subOptions: []
              }
            ],
          },
        ]
      },
      {
        name: "BBQ",
        id: 10,
        subOptions: [],
      }
    ]
  },
];

export default toppingOptions;