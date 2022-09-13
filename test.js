const obj = {
  a: 1
}

const func = () => obj

const a = func()

a.a=5

console.log(obj)