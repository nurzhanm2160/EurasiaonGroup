const baseURL = 'http://localhost:3000/posts/'

const instance = axios.create({
  baseURL
})

const postsAPI = {
  getPosts: () => {
    return instance.get().then(response => response)
  },
  createPost: (title) => {
    return instance.post('', { title })
  },
  updatePost: (id, newTitle) => {
    return instance.patch(`${id}`, { title: newTitle })
  },
  deletePost: (id) => {
    return instance.delete(`${id}`)
  }
}

const getPosts = async () => {
  const {data} = await postsAPI.getPosts()
  return data
}

const createPost = async (title) => {
  await postsAPI.createPost(title)
}

const updatePost = (id, newTitle) => {
  postsAPI.updatePost(id, newTitle)
}

const deletePost = (id) => {
  postsAPI.deletePost(id)
}


const list = document.getElementById('list')
const input = document.getElementById('input')
const sendButton = document.getElementById('send')

sendButton.addEventListener('click', () => {
  createPost(input.value)
  clearInput()
  clearTemplate()
  renderTemplate()
})

const clearInput = () => input.value = ''

const clearTemplate = () => list.innerHTML = ''

const renderTemplate = () => {
  getPosts().then(data => {
    for (let i = 0; i < data.length; i++) {
      const editButton = document.createElement('button')
      const removeButton = document.createElement('button')
      const div = document.createElement('div')
      const p = document.createElement('p')
      const newTitleInput = document.createElement('input')
      const saveButton = document.createElement('button')

      editButton.textContent = 'редактировать'
      removeButton.textContent = 'удалить'
      p.textContent = data[i].title
      newTitleInput.value = data[i].title
      saveButton.textContent = 'сохранить'

      div.appendChild(p)
      div.appendChild(editButton)
      div.appendChild(removeButton)
      list.appendChild(div)

      removeButton.addEventListener('click', () => {
        deletePost(data[i].id);
        div.remove();
      });

      editButton.addEventListener('click', () => {
        div.replaceChild(newTitleInput, p)
        div.replaceChild(saveButton, editButton)
      })

      saveButton.addEventListener('click', () => {
        const newTitle = newTitleInput.value
        updatePost(data[i].id, newTitle)

        p.textContent = newTitle

        div.replaceChild(p, newTitleInput)
        div.replaceChild(editButton, saveButton)
      })

    }
  })
}

window.onload = () => renderTemplate()