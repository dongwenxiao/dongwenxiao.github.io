const del = require('del')

const todo = [
    'public/**',
    '!public', 
    '!public/CNAME',
    '!public/sayhi/**',
    '!public/other/**'
]

// del.sync(todo)
del(todo).then(paths => {
    // console.log('Clean public folder generate files.')
    // console.log('Clean public folder generate files :\n', paths.join('\n'))
})

