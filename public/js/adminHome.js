// Bismillah
let AllUserData = []
let userDataView = false
let createOrUpdate = 'create'
let uMail = ''


// Show dtata of users
async function showDevDetails(crud) {

    await fetch('http://localhost:3333/admin/allUserData')
        .then((res) => res.json())
        .then(data => data.error ? showTostError(data.errorMessage) : AllUserData = data.data)

    document.querySelector('.loader').style.display = 'none'
    const page = document.querySelector('.dev-details')
    const demoList = document.querySelectorAll('.user-list .demo')
    const userList = document.querySelector('.user-list')

    if (crud === 'read') {
        document.querySelector('.user-view').style.display = 'none'
        document.querySelector('.user-list').style.display = 'block'
        document.querySelector('#add').style.display = 'none'
        document.querySelectorAll('.demo button').forEach(data => data.style.display = 'none')

        // clear all list
        demoList.forEach(elems => elems.remove())

        // add List of users
        let demos = ''
        AllUserData.forEach((data) => { demos += `<div class="demo"><div class="inner"><p>${data.fullName}</p><span></span></div></div>` })

        // insert lists
        userList.insertAdjacentHTML("beforeend", demos)

    }
    else if (crud === 'create') {

        createOrUpdate = 'create'
        document.querySelector('#add').style.display = 'block'
        document.querySelector('.user-view').style.display = 'block'
        document.querySelector('#add').style.display = 'none'
        document.querySelector('.user-list').style.display = 'none'
        document.querySelector('.loader').style.display = 'block'
        document.querySelector('.loader').innerHTML = 'Create a new User'

        // to remove dislity of input
        const inputList = document.querySelectorAll('.user-view input')
        inputList.forEach(data => {
            data.disabled = false
        })

    } else {

        document.querySelectorAll('.demo button').forEach(data => data.style.display = 'block')
        document.querySelector('.user-list').style.display = 'block'
        document.querySelector('.user-view').style.display = 'none'
        document.querySelector('#add').style.display = 'block'
        document.querySelector('#add').style.transform = 'rotate(45deg)'

        // clear all list
        demoList.forEach(elems => elems.remove())
        const inputList = document.querySelectorAll('.user-view input')
        inputList.forEach(data => {data.value = ''})

        // add List of users
        let demos = ''
        AllUserData.forEach((data) => {
            demos += `<div class="demo"><div class="inner"><p>${data.fullName}</p><span></span>
            <button onclick="showUserdetails('${data._id}','read',this)" id="view-btn">View</button>
            <button onclick="showUserdetails('${data._id}','update',this)" id="update-btn">Update</button>
            <button onclick="showUserdetails('${data._id}','delete',this)" id="delete-btn">Delete</button></div></div>`
        })

        // insert lists
        userList.insertAdjacentHTML("beforeend", demos)
    }
    page.classList.add('show')
}


// Remove-Page of User Data
function removeShowPage() {
    const cond = document.querySelector('.search-user')
    const page = document.querySelector('.dev-details')

    cond.addEventListener('click', evnt => evnt.stopPropagation())
    page.classList.remove('show')
}
removeShowPage()


// Show User Create Layout/Update layout
function showAddUser() {
    document.querySelector('.user-view').style.display = 'block'
    document.querySelector('.user-view').style.animation = 'fade 1s'
}


// show User Dats
function showUserdetails(id, mission, bthis) {

    // Button Hover Effect
    function buttonHover(btn) {
        btn.style.background = '#ffffff54'
        btn.style.color = '#000000'
        setTimeout(() => {
            btn.style.color = '#ffffff'
            btn.style.background = '#a088881f'

        }, 500)
    } buttonHover(bthis)

    // Delete user we dont need show user data so its first thing
    if (mission === 'delete') {
        fetch('http://localhost:3333/admin/deleteUser', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UID: id
            })
        })
            .then(res => res.json())
            .then(data => { data.error ? showTostError(errorMessage) : (AllUserData = data.data, showDevDetails('update'),showTostError('User deleted')) })

    } else {

        document.querySelector('.user-view').style.display = 'block'
        document.querySelector('#add').style.transform = 'rotate(0deg)'
        document.querySelector('.user-view').style.animation = 'fade 1s'
        const btn = document.querySelector('.loader')
        const demoList = document.querySelectorAll('.user-list .demo')
        const userList = document.querySelector('.user-list')
        const inputList = document.querySelectorAll('.user-view input')
        userDataView = true
        const userFullName = document.querySelector('#userFullName')
        const userPhone = document.querySelector('#userPhone')
        const userPassword = document.querySelector('#userPassword')

        // clear all list
        demoList.forEach(elems => elems.remove())

        // // add List of users
        let demos = ''
        AllUserData.forEach((data) => {

            if (data._id === id) {
                demos += `<div class="demo"><div class="inner"><p>${data.fullName}</p><span></span>
              <button onclick="showUserdetails('${data._id}','read',this)" id="view-btn">View</button>
              <button onclick="showUserdetails('${data._id}','update',this)" id="update-btn">Update</button>
              <button onclick="showUserdetails('${data._id}','delete',this)" id="delete-btn">Delete</button></div></div>`
                userFullName.value = data.fullName
                userEmail.value = data.email
                userPhone.value = data.phone
                userPassword.value = data.password
            }
        })
        // insert lists
        userList.insertAdjacentHTML("beforeend", demos)

        // disabled inputfield false
        if (mission === 'update') {

            uMail = document.querySelector('#userEmail').value
            inputList.forEach(data => data.disabled = false)
            btn.style.display = 'block'
            btn.innerHTML = 'Update user'
            createOrUpdate = 'update'

        } else if (mission === 'read') { inputList.forEach(data => data.disabled = true) }
    }
}


// onclick of add/none
document.getElementById('add').addEventListener('click', (evnt) => {
    if (userDataView) {
        showDevDetails('update')
        userDataView = false
    } else { showDevDetails('create') }
})



// Update of Create button
document.querySelector('.loader').addEventListener('click', (evnt) => {
    if (createOrUpdate === 'create') {
        const userFullName = document.querySelector('#userFullName').value
        const Uemail = document.querySelector('#userEmail').value
        const Uphone = document.querySelector('#userPhone').value
        const Upass = document.querySelector('#userPassword').value

        if (validateSignUp(Upass, Uemail, Uphone, userFullName)) {
            fetch('http://localhost:3333/admin/createUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userFullName,
                    phone: Uphone,
                    email: Uemail,
                    password: Upass
                })
            })
                .then(res => { res.json() })
                .then(data => { showTostError('User created or updated if email or phone already exits','info') })
                // .then(data => { data.error?showTostError(data.errorMessage):(AllUserData = data.data,showTostError('User created','info')) })

        }
        // else { document.querySelector('.loader').removeEventListener('click')}

    } else if (createOrUpdate === 'update') {

        const userFullName = document.querySelector('#userFullName').value
        const userEmail = document.querySelector('#userEmail').value
        const userPhone = document.querySelector('#userPhone').value
        const userPassword = document.querySelector('#userPassword').value

        if (validateSignUp(userPassword, userEmail, userPhone, userFullName)) {

            fetch('http://localhost:3333/admin/updateUser', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userFullName,
                    phone: userPhone,
                    email: userEmail,
                    password: userPassword,
                    filterData: uMail
                })
            })
                .then(res => res.json())
                .then(data => { data.error ? showTostError(data.errorMessage) : (AllUserData = data.data, showDevDetails('update'),showTostError('User updated','info')) })
            // to remove dislity of input
            const inputList = document.querySelectorAll('.user-view input')
            inputList.forEach(data => {
                data.value = ''
            })
        }
    }
})


// Serach Users Data
async function searchUserData(inputValue) {

    const demoList = document.querySelectorAll('.user-list .demo')
    const userList = document.querySelector('.user-list')

    await fetch('http://localhost:3333/admin/searchUserData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            inputValue
        })
    })
        .then(res => res.json())
        .then(data => { data.error ? showTostError(data.errorMessage) : AllUserData = data.searchData })

    // clear all list
    demoList.forEach(elems => elems.remove())

    // // add List of users
    let demos = ''
    AllUserData.forEach((data) => {

        demos += `<div class="demo"><div class="inner"><p>${data.fullName}</p><span></span>
          <button onclick="showUserdetails('${data._id}','read',this)" id="view-btn">View</button>
          <button onclick="showUserdetails('${data._id}','update',this)" id="update-btn">Update</button>
          <button onclick="showUserdetails('${data._id}','delete',this)" id="delete-btn">Delete</button></div></div>`
        userFullName.value = data.fullName
        userEmail.value = data.email
        userPhone.value = data.phone
        userPassword.value = data.password
    })

    // insert lists
    userList.insertAdjacentHTML("beforeend", demos)
}


// validate create new user
function validateSignUp(pass, email, phone, nameUSer) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@!%*?&]{8,}$/
    const phonePattern = /^\d{10}$/
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const namePattern = /^[A-Za-z\s]+$/


    if (pass === '' || email === '' || phone === '' || nameUSer === '') {
        showTostError('Please fill all field')
        return false
    } else if (nameUSer.length < 4) {
        showTostError('Name should contail atleast 5 letters')
        return false
    } else if (!namePattern.test(nameUSer)) {
        showTostError('You cant use numbers in your name')
        return false
    } else if (!phonePattern.test(phone)) {
        showTostError('Invalid phone number')
        return false
    } else if (!emailPattern.test(email)) {
        showTostError('Invalid email adress')
        return false
    } else if (!passwordPattern.test(pass)) {
        showTostError('Please enter a password with including atleast one number,symbol,capital and small letters and it should contain eight charecters')
        return false
    }
    return true

}


// show toast error
function showTostError(info,yah=null) {
    const toast = document.querySelector('.toast')
    if(yah === 'info'){
        toast.classList.add('info')
    }

    toast.innerHTML = info
    toast.style.bottom = '30px'
    toast.style.opacity = '1'

    setTimeout(() => {
        toast.style.opacity = '0'
        toast.style.bottom = '-100px'
        if(yah === 'info'){
        toast.classList.remove('info')
    }

    }, 5000)

}