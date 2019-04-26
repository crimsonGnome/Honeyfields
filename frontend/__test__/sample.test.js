describe('sample test 101', () => {
  it('works as expexted', () => {
    let age = 100;
    expect(1).toEqual(1);
    expect(age).toEqual(100);
  });

  it('handles ranges just fine', () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });

  it('it makes a list of dog names', () => {
    const dogs = ['snickers', 'Hugo'];
    expect(dogs).toEqual(dogs);
    expect(dogs).toContain('snickers');
  });
});
