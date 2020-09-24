export const getApiURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'http://dev.suche-transport.at/write';
  }

  return 'http://localhost:7000/write';
}

export const dishTags = [
  {
    key: 'fit',
    text: 'fit',
    value: 'fit',
  },
  {
    key: 'good',
    text: 'good',
    value: 'good',
  },
  {
    key: 'healthy',
    text: 'healthy',
    value: 'healthy',
  },
  {
    key: 'tasty',
    text: 'tasty',
    value: 'tasty',
  },
]

export const dishCategories = [
  {
    key: '1',
    text: 'soups and starters',
    value: '1',
  },
  {
    key: '2',
    text: 'main dishes',
    value: '2',
  },
  {
    key: '3',
    text: 'desserts',
    value: '3',
  },
]
