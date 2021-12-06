import faker from 'faker'

export default (req, res) => {
  const profiles = [...new Array(10)].map((_, i) => {
    return {
      id: i,
      name: faker.name.findName(),
      userImage: faker.image.avatar(),
    }
  })

  res.status(200).json(JSON.stringify(profiles))
}
