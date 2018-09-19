import Chance from 'chance';
import httpStatus from 'http-status';

import { handleSavePerson } from './Header';

const chance = new Chance();

const getPersonDataToSave = () => ({
  age: chance.natural({ min: 1, max: 20 }).toString(),
  ammunition: chance.natural({ min: 1, max: 20 }).toString(),
  food: chance.natural({ min: 1, max: 20 }).toString(),
  gender: chance.pickone(['M', 'F']),
  latitude: chance.word(),
  longitude: chance.word(),
  medication: chance.natural({ min: 1, max: 20 }).toString(),
  name: chance.word(),
  water: chance.natural({ min: 1, max: 20 }).toString()
});

describe('Header State', () => {
  describe('When person is saved correctly', () => {
    const newPerson = getPersonDataToSave();
    const expectedResponse = {
      data: newPerson,
      status: httpStatus.CREATED
    };
    const expectedChannelsFetched = {
      status: httpStatus.OK,
      data: [newPerson]
    };
    
    const options = {
      form: {
        values: () => newPerson,
        validate: () => ({ isValid: true }),
        clear: () => {}
      },
      store: {
        peopleStore: {
          createPerson: jest.fn().mockResolvedValue(expectedResponse),
          fetchPeople: jest.fn().mockResolvedValue(expectedChannelsFetched)
        }
      },
      notifier: {
        update: jest.fn()
      },
      handleCloseDialogSurvivor: () => {}
    };
    
    it('ensures that store.peopleStore.createPerson has been called', async () => {
      const water = `Water:${newPerson.water}`;
      const food = `Food:${newPerson.food}`;
      const medication = `Medication:${newPerson.medication}`;
      const ammunition = `Ammunition:${newPerson.ammunition}`;
      
      const expectedPersonCreated = {
        age: Number(newPerson.age),
        gender: newPerson.gender,
        items: `${water};${food};${medication};${ammunition}`,
        lonlat: `Point(${newPerson.latitude} ${newPerson.longitude})`,
        name: newPerson.name
      };
  
      await handleSavePerson(options);
  
      expect(options.store.peopleStore.createPerson).toHaveBeenCalledWith(expectedPersonCreated);
    });
  
    it('ensures that store.peopleStore.fetchPeople has been called', async () => {
      await handleSavePerson(options);
  
      expect(options.store.peopleStore.fetchPeople).toHaveBeenCalled();
    });

    it('ensures that notifier was called with success status', async () => {
      const expectNotifier = {
        message: `${newPerson.name} was created successfully`,
        variant: 'success'
      };
  
      await handleSavePerson(options);
  
      expect(options.notifier.update).toHaveBeenCalledWith(expectNotifier);
    });
  });
  
  describe('When person is not saved and status error is 500', () => {
    const newPerson = getPersonDataToSave();
    const expectedErrorResponse = {
      response: {
        status: httpStatus.INTERNAL_SERVER_ERROR
      }
    };
    
    const options = {
      form: {
        values: () => newPerson,
        validate: () => ({ isValid: true }),
        clear: () => {}
      },
      store: {
        peopleStore: {
          createPerson: jest.fn().mockRejectedValue(expectedErrorResponse)
        }
      },
      notifier: {
        update: jest.fn()
      },
      handleCloseDialogSurvivor: () => {}
    };
    
    it('ensures that notifier was called with error status', async () => {
      const expectNotifier = {
        message: `Error on saving ${newPerson.name}. Contact the administrator for more information.`,
        variant: 'error'
      };
  
      await handleSavePerson(options);
      
      expect(options.notifier.update).toHaveBeenCalledWith(expectNotifier);
    });
  });
  
  describe('When person is not saved and status error is 422', () => {
    const newPerson = getPersonDataToSave();
    const expectedErrorResponse = {
      response: {
        status: httpStatus.UNPROCESSABLE_ENTITY
      }
    };
    
    const options = {
      form: {
        values: () => newPerson,
        validate: () => ({ isValid: true }),
        clear: () => {}
      },
      store: {
        peopleStore: {
          createPerson: jest.fn().mockRejectedValue(expectedErrorResponse)
        }
      },
      notifier: {
        update: jest.fn()
      },
      handleCloseDialogSurvivor: () => {}
    };
    
    it('ensures that notifier was called with error status', async () => {
      const expectNotifier = {
        message: `${newPerson.name} was already created`,
        variant: 'info'
      };
      
      await handleSavePerson(options);
      
      expect(options.notifier.update).toHaveBeenCalledWith(expectNotifier);
    });
  });
});
