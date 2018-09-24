const survivorFields = {
  name: {
    label: 'Name',
    id: 'name',
    rules: 'required|string',
    errorMessage: 'Name is required',
    required: true,
    type: 'text'
  },
  age: {
    label: 'Age',
    id: 'age',
    rules: 'required|string',
    errorMessage: 'Age is required',
    required: true,
    type: 'number'
  },
  gender: {
    label: 'Gender',
    id: 'gender',
    rules: 'required|string',
    errorMessage: 'Gender is required',
    helperText: 'Please select your gender',
    required: true,
    type: 'text'
  },
  latitude: {
    label: 'Latitude',
    id: 'latitude',
    rules: 'required|string',
    errorMessage: 'Latitude is required',
    required: true,
    type: 'text'
  },
  longitude: {
    label: 'Longitude',
    id: 'longitude',
    rules: 'required|string',
    errorMessage: 'Longitude is required',
    required: true,
    type: 'text'
  },
  water: {
    label: 'Water',
    id: 'water',
    rules: 'string',
    required: false,
    type: 'number'
  },
  food: {
    label: 'Food',
    id: 'food',
    rules: 'string',
    required: false,
    type: 'number'
  },
  medication: {
    label: 'Medication',
    id: 'medication',
    rules: 'string',
    required: false,
    type: 'number'
  },
  ammunition: {
    label: 'Ammunition',
    id: 'ammunition',
    rules: 'string',
    required: false,
    type: 'number'
  }
};

export default {
  survivorFields
};
