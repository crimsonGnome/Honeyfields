function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    //Simulating an Api
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('snickers');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('snickers');
    fetchDogs('Hugo');
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });
});

it('can Create a person', () => {
  const me = new Person('Joe', ['sushi', 'chinese']);
  expect(me.name).toBe('Joe');
});

it('can fetch foods', async () => {
  const me = new Person('Joe', ['sushi', 'chinese']);
  //moc the fav foods function
  me.fetchFavFoods = jest.fn().mockResolvedValue(['sushi', 'burgs']);
  const favFoods = await me.fetchFavFoods();
  //console.log(favFoods);
  expect(favFoods).toContain('sushi');
});
