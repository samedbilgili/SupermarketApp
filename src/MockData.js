import { nanoid } from 'nanoid';

export const shelfTypes = [
  'Gıda', 'Kırtasiye', 'Kozmetik', 'Elektronik', 'Temizlik'
]

export const data = [
  {
    id: "market-a",
    name: "Market A",
    shelves: [
      {
        id: "r1",
        name: "R1",
        type: "Gıda",
        products: [
          { id: nanoid(), name: "Ekmek" },
          { id: nanoid(), name: "Un" },
          { id: nanoid(), name: "Makarna" }
        ],
      },
      {
        id: "r2",
        name: "R2",
        type: "Temizlik",
        products: [
          { id: nanoid(), name: "Bez" },
          { id: nanoid(), name: "Deterjan" },
          { id: nanoid(), name: "Sabun" },
          { id: nanoid(), name: "Sünger" },
        ],
      },
      {
        id: "r3",
        name: "R3",
        type: "Kırtasiye",
        products: [
          { id: nanoid(), name: "Kalem" },
          { id: nanoid(), name: "Defter" },
          { id: nanoid(), name: "Silgi" },
        ],
      },
      {
        id: "r4",
        name: "R4",
        type: "Gıda",
        products: [
          { id: nanoid(), name: "Pirinç" },
          { id: nanoid(), name: "Un" },
          { id: nanoid(), name: "Bulgur" },
          { id: nanoid(), name: "Salça" },
        ],
      },
    ],
  },
  {
    id: "market-b",
    name: "Market B",
    shelves: [
      {
        id: "r1",
        name: "R1",
        type: "Gıda",
        products: [
          { id: nanoid(), name: "Ekmek" },
          { id: nanoid(), name: "Un" },
          { id: nanoid(), name: "Makarna" },
        ],
      },
      {
        id: "r2",
        name: "R2",
        type: "Temizlik",
        products: [
          { id: nanoid(), name: "Sabun" },
          { id: nanoid(), name: "Toz Bezi" },
        ],
      },
      {
        id: "r3",
        name: "R3",
        type: "Kırtasiye",
        products: [
          { id: nanoid(), name: "Silgi" },
          { id: nanoid(), name: "Kalemtraş" },
          { id: nanoid(), name: "Kalem" },
          { id: nanoid(), name: "Defter" },
        ],
      },
    ],
  },
];