export const inventoryTestData = [
  {
    description: 'add single item to cart',
    itemsToAdd: ['Sauce Labs Backpack'],
    itemsToRemove: [],
    expectedCartCount: 1,
  },
  {
    description: 'add multiple items and remove one',
    itemsToAdd: ['Sauce Labs Backpack', 'Sauce Labs Bike Light'],
    itemsToRemove: ['Sauce Labs Backpack'],
    expectedCartCount: 1,
  },
  {
    description: 'checkout happy path',
    itemsToAdd: ['Sauce Labs Backpack'],
    checkoutInfo: { firstName: 'John', lastName: 'Doe', postalCode: '12345' },
    shouldComplete: true,
    expectedConfirmation: 'Thank you for your order!',
  },
  {
    description: 'checkout missing information',
    itemsToAdd: ['Sauce Labs Backpack'],
    checkoutInfo: { firstName: '', lastName: '', postalCode: '' },
    shouldComplete: false,
    expectedError: 'Error: First Name is required',
  },
  {
    description: 'sort products by price low to high',
    sortOption: 'Price (low to high)',
    expectedFirstItem: 'Sauce Labs Onesie',
  },
  {
    description: 'reset app state',
    itemsToAdd: ['Sauce Labs Backpack'],
    resetApp: true,
    expectedCartCount: 0,
  },
]; 