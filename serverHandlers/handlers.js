// /*eslint-disable*/
// const data = require('./../fakeBackend.js')
// let _ = require('lodash')
// // var url = require('url')
// var fs = require('fs')
// import isValid from './../src/helpers/validations.js'

// // var contents = fs.readFileSync('fakeData.js', 'utf8') console.log(contents)
// // console.log(data.accounts) function fullUrl(req) {     return url.format({
// // protocol: req.protocol, hostname: req.hostname, pathname: req.originalUrl })
// // }

// let id = _.last(data.accounts).id
// const getUser = (req, res) => {
//   setTimeout(function() {
//     res.json(data.accounts)
//   }, 2000)
//   // res.json(data.accounts)
// }

// const checkUser = (req, res) => {
//   setTimeout(function() {
//     // console.log('body', req.body)
//     const user = _.find(data.accounts, (o) => {
//       return o.name === req.body.name
//     })
//     const isExist = user && _.some(data.accounts, (o) => {
//       return o.password === req.body.loginPassword
//     })
//     // console.log(isExist)
//     if (isExist) {
//       // let userId = _.find(data.accounts, (o) => {     return o.name ===
//       // req.body.name }).id console.log(req.body.name)
//       res.status(200).send({user}).end()
//     } else {
//       res.status(404).end()
//     }
//   }, 500)
// }

// export const regUser = (req, res) => {

//   setTimeout(function() {
//     let errors = isValid(req.body)
//     if (!errors.valid) {
//       // console.log('invalid')
//       res.status(400)
//       res.send(errors)
//       res.end()
//       return
//     }
//     var isExist = _.some(data.accounts, (o) => {
//       return o.name.toLowerCase() === req.body.name.toLowerCase()
//     })
//     if (isExist) {
//       // console.log('exist')
//       res.status(409).end()
//     } else {
//       // console.log('added') console.log(req.body)

//       data.accounts.push(Object.assign({}, req.body, {
//         id: ++id
//       }))
//       res.status(200).end()
//       // console.log(data.accounts)
//     }
//   }, 500)
// }

// export const getUserdata = (req, res) => {
//   let foundUser = _.find(data.accounts, (user) => {
//     return user.name === req.params.username
//   })
//   // console.log('foundUser', foundUser, '\n', 'callCounter = ', ++callCounter)
//   if (!fs.existsSync(__dirname + './../' + foundUser.avatar)) {
//     foundUser.avatar = 'uploads\\house.jpg'
//   }
//   if (foundUser) {
//     setTimeout(function() {
//       res.send(Object.assign({}, foundUser, {password: ''})).status(200).end()
//     }, 200)
//   } else {
//     res.status(404).end()
//   }
// }

// export const uploadIMG = (req, res) => {
//   var options = {
//     // root:
//     // 'E:/web_projects/react-router-ru-tutorial-authenticated_component/uploads'
//     root: __dirname + '../uploads'
//   }
//   let username = req.params.username
//   let foundUser = _.find(data.accounts, (user) => {
//     return user.name === username
//   })

//   if (foundUser.avatar !== '/uploads/house.jpg') {
//     fs.unlinkSync(foundUser.avatar)
//   }

//   foundUser['avatar'] = '/' + req.file.path
//   // console.log('params', req.params.username) console.log('IMG', req.file)
//   console.log('\n', foundUser)
//   res.send(req.file).end()
// }

// export const getAllFriends = (req, res) => {
//   let friendlist = []
//   let foundUser = _.find(data.accounts, (user) => {
//     return user.name === req.params.username
//   })
//   // console.log(foundUser)
//   foundUser.friendList.forEach(friend => {
//     console.log(friend)
//     friendlist.push(Object.assign({}, _.find(data.accounts, (user) => {
//       return user.name.toLowerCase() === friend.toLowerCase()
//     }), {password: ''}))
//   })
//   console.log(friendlist)
//   if (foundUser) {
//     res.status(200).send(friendlist).end()
//   } else {
//     res.status(404).end()
//   }
// }

// export const getAllRequestedFriends = (req, res) => {
//   let reqFriendList = [];
//   let foundUser = _.find(data.accounts, (user) => {
//     return user.name === req.params.username
//   })

//   foundUser.requestTo.forEach(friend => {
//     console.log(friend)
//     reqFriendList.push(Object.assign({}, _.find(data.accounts, (user) => {
//       return user.name.toLowerCase() === friend.toLowerCase()
//     }), {password: ''}))
//   })

//   res.status(200).send(reqFriendList).end()
// };

// export const getAllResponsedFriends = (req, res) => {
//   let resFriendList = [];
//   let foundUser = _.find(data.accounts, (user) => {
//     return user.name === req.params.username
//   })

//   foundUser.requestFrom.forEach(friend => {
//     console.log(friend)
//     resFriendList.push(Object.assign({}, _.find(data.accounts, (user) => {
//       return user.name.toLowerCase() === friend.toLowerCase()
//     }), {password: ''}))
//   })

//   res.status(200).send(resFriendList).end()
// };

// export const getFiltred = (req, res) => {
//   let filtred = _.filter(data.accounts, (user) => {
//     return user.name.toLowerCase().includes(req.params.value.toLowerCase())
//   })
//   res.status(200).send(filtred). //move to end
//   end()
// }

// export const addToFriends = (req, res) => {
//   // if names are unique we dont need to find users
//   let foundUser = _.find(data.accounts, (user) => {
//     return user.name.toLowerCase() === req.body.to.toLowerCase()
//   })
//   let addFriend = _.find(data.accounts, (user) => {
//     return user.name.toLowerCase() === req.body.add.toLowerCase()
//   })

//   let isInRequest = _.some(foundUser.requestFrom, friendToAdd => {
//     return friendToAdd.toLowerCase() === addFriend.name.toLocaleLowerCase()
//   })

//   if (isInRequest) {
//     foundUser.friendList.push(addFriend.name)

//     addFriend.friendList.push(foundUser.name)

//     _.remove(foundUser.requestFrom, friend => {
//       return friend.toLowerCase() === addFriend.name.toLowerCase()
//     })

//     _.remove(addFriend.requestTo, friend => {
//       return friend.toLowerCase() === foundUser.name.toLowerCase()
//     })

//     res.status(200).send(addFriend).end()

//     return
//   } else {
//     foundUser.requestTo.push(addFriend.name.toLowerCase())
//     addFriend.requestFrom.push(foundUser.name.toLowerCase())
//     console.log('foundUser - ', foundUser, '\n addFriend - ', addFriend)
//     res.status(200).send(addFriend).end()
//   }
// }

// export const removeRequest = (req, res) => {
//   let foundUser = _.find(data.accounts, (user) => {
//     return user.name.toLowerCase() === req.body.from.toLowerCase()
//   })
//   let addFriend = _.find(data.accounts, (user) => {
//     return user.name.toLowerCase() === req.body.remove.toLowerCase()
//   })
//   _.remove(foundUser.requestTo, (friend) => {
//     return friend.toLowerCase() === addFriend.name.toLowerCase()
//   })
//   _.remove(addFriend.requestFrom, (friend) => {
//     return friend.toLowerCase() === foundUser.name.toLowerCase()
//   })
//   res.status(200).send(addFriend).end()
// }

// export const removeFriend = (req, res) => {
//   let currentUser = _.find(data.accounts, (user) => {
//     console.log(user.name.toLowerCase())
//     console.log(req.body.from.toLowerCase())
//     console.log(req.body.remove.toLowerCase())
//     return user.name.toLowerCase() === req.body.from.toLowerCase()
//   })
//   let removeFriend = _.find(data.accounts, (user) => {
//     return user.name.toLowerCase() === req.body.remove.toLowerCase()
//   })
//   console.log('before', currentUser, removeFriend)

//   _.remove(currentUser.friendList, (friend) => {
//     return friend.toLowerCase() === removeFriend.name.toLowerCase()
//   })

//   _.remove(removeFriend.friendList, (friend) => {
//     return friend.toLowerCase() === currentUser.name.toLowerCase()
//   })
//   console.log('after', currentUser, removeFriend)
//   res.status(200).send(removeFriend).end()
// }

// export const showData = () => {
//   console.log(data.accounts)
// }

// export {getUser, checkUser}
