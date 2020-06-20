// GLOBALS

const BASE_URL = 'https://jsonplace-univclone.herokuapp.com';

// FETCHING DATA

function fetchData(url) {
    // generic resuable fetch that handles the JSON result and error catch
    // input URL param is coming from one of the four fetch functions below
    return fetch(url)
    .then( function (result) { return result.json(); })
    .catch( function (error) { console.error(error); });
}

function fetchUsers() { 
    // fetch users
    // this URL is being sent to fetchData()
    return fetchData( `${ BASE_URL }/users` ); 
}

function fetchUserAlbumList(userId) { 
    // fetch user's album list
    return fetchData( `${ BASE_URL }/users/${ userId }/albums?_expand=user&_embed=photos` );
}

function fetchUserPosts(userId) { // fetch user's post list
    return fetchData(`${ BASE_URL }/users/${ userId }/posts?_expand=user`);
}

function fetchPostComments(postId) { // fetch user's post's comments
    return fetchData(`${ BASE_URL }/posts/${ postId }/comments`);
}

// USER & USERS LIST

// start work on the inner most object/element first
// goal: as a user, I want to build the HTML for the 'user card' and make the .data() accessible
// input: accepts a parameter called 'user' from the renderUserlist() function
// output: HTML for a 'user card' and accessible 'data' via .data() method

function renderUser(user) { 
    // user param is coming from renderUserList()
    return $(`
        <div class="user-card" data-user="${user.id}">
            <header>
                <h2>${user.name}</h2>
            </header>
            <section class="company-info">
                <p><b>Email:</b> ${user.email}</p>
                <p><b>Company:</b> ${user.company.name}</p>
                <p><b>Tagline:</b> "${user.company.catchPhrase}"</p>
            </section>
            <footer>
                <button class="load-posts">POSTS BY ${user.username}</button>
                <button class="load-albums">ALBUMS BY ${user.username}</button>
            </footer>
        </div>
    `).data('user', user); // so we can access this later
}

// then work on the outer most object/element
// goal: as a user I want to build and display the 'userlist' as a set of 'user' cards
// input: accepts a param called 'userList' that is coming from fetch(Users) 'data' then
// output: loops through the 'userList' for each 'user' & appends a set of 'user' cards to '#user-list' 

function renderUserList(userList) {
    $('#user-list').empty();
    userList.forEach(function (user) {
        $('#user-list').append(renderUser(user));
    })
}

// PHOTOS, ALBUM, & ALBUM LIST

// start work on the inner most object/element first
// goal: as a user, I want to build the HTML with the photo 'data' send it to the album's photo card
// input: accepts a parameter called 'photo' from the renderAlbum() function
// output: HTML for a photo card and accessible 'data' via .data() method

function renderPhoto(photo) {
     return $(`
        <div class="photo-card">
            <a href="${photo.url}" target="_blank">
            <img src="${photo.thumbnailUrl}">
            <figure>${photo.title}</figure>
            </a>
        </div>
    `)
}

// continue work on the 'middlest' object/element
// goal: as a user, I want to build the HTML for the 'album' card, which contains the 'photo' card
// input: accepts a parameter called 'album' from the renderAlbumList() function
// runs: loops through the 'album photos' for each 'photo' to 'photo-list' via renderPhoto() function 
// output: HTML for an 'album' which includes a nested, fully formed 'photo card'

function renderAlbum(album) {
    
    album.photos.forEach(function (photo) {
        $('.photo-list').append(renderPhoto(photo));
    })
    return $(`
    <div class="album-card">
        <header><h3>${album.title} by ${album.username}</h3></header>
        <div class="photo-list"></div>
    </div>
    `);
}

// lastly work on the outer most object/element
// goal: as a user I want to build and display the 'albumList' as a set of 'album' cards
// input: accepts a parameter called 'albumList' from the fetchAlbumList() function
// output: loops through the 'albumList' for each 'album' & appends a set of 'albums' cards to '#album-list' 
// output: toggles active class to show or hide the album list in the UI.

function renderAlbumList(albumList) {
    $('#app section.active').removeClass('active');
    const albumListEl = $('#album-list');
    albumListEl.empty()
    albumList.forEach(function(album) {
        albumListEl.append(renderAlbum(album));
    });
    albumListEl.addClass('active');
}

// COMMENTS, POST, & POST LIST

// start work on the inner most object/element first
// goal: as a user, I want check prevent comment from being fetched if I have already fetched them 
// input: accepts a parameter called 'post' from the [CLICK HANDLERS ???]
// output: HTML for a photo card and accessible 'data' via .data() method

// PLEASE explain what is truly happening here, I understand whole conditional
// Yet, I do not understand the flow of data through this function

function setCommentsOnPost(post) {
    // where is this param coming from?
    if (post.comments) {
        return Promise.reject();
    } else {
        return fetchPostComments(post.id).then( function (comments) {
            post.comments = comments;
            return post;
        });
   }
}

// goal: as a user I want to see comments when 'show' is clicked
// goal: as a user I do not want to see comments whem 'hide' is clicked
// input: accepts a parameter called 'postCardEl' from the found '.footer'about
// output: conditionally toggles the comment state and updates the link text 

function toggleComments(postCardEl) {
    const footerEl = postCardEl.find('footer');
    if (footerEl.hasClass('comments-open')) {
        footerEl.removeClass('comments-open');
        footerEl.find('.verb').text('show');
    } else {
        footerEl.addClass('comments-open');
        footerEl.find('.verb').text('hide');
    }
  }

// continue work on the 'middlest' object/element
// goal: as a user, I want to build the HTML for the 'post' card and make the .data() accessible
// input: accepts a parameter called 'post' from the renderPostList() function
// output: HTML for a 'post card' and accessible 'data' via .data() method

function renderPost(post) {
    return $(`
        <div class="post-card">
            <header>
                <h3>${post.title} </h3>
                <h4>~ By ${post.user.username}</h4>
            </header>
            <p>${post.body}</p>
            <footer>
                <div class="comment-list"></div>
                <a href="#" class="toggle-comments">(<span class="verb">show</span> comments)</a>
            </footer>
        </div>
    `).data('post', post);
}

// lastly work on the outer most object/element
// goal: as a user I want to build and display the 'postList' as a set of 'post' cards
// input: accepts a parameter called 'postList' from the fetchPostList() function
// output: loops through the 'postList' for each 'post' & appends a set of 'post' cards to '#post-list' 
// output: toggles active class to show or hide the post list in the UI.

function renderPostList(postList) {
    $('#app section.active').removeClass('active');
    const postListEl = $('#post-list');
    postListEl.empty()
    postList.forEach(function(post) {
        postListEl.append(renderPost(post));
    });
    postListEl.addClass('active');
}

//CLICK HANDLERS

// goal: as a user I want click a button to display posts
// input: runs when the '.load-posts' button is clicked
// output: calls fetchUserPosts() promise and then calls rendersPostList() function

$('#user-list').on('click', '.user-card .load-posts', function () {
    const user = $(this).closest('.user-card').data('user');
    fetchUserPosts(user.id).then(renderPostList);
});

// goal: as a user I want to click a button to display albums
// input: runs when the '.load-albums' button is clicked
// output: calls fetchUserAlbumList() promise and then calls renderAlbumList() function

$('#user-list').on('click', '.user-card .load-albums', function () {
    const user = $(this).closest('.user-card').data('user');
    fetchUserAlbumList(user.id).then(renderAlbumList);
});

// goal: as a user I want to click a button to toggle comments
// input: runs when the '.toggle-comments' button is clicked
// output: HTML for the comments and toggles their visibility

$('#post-list').on('click', '.post-card .toggle-comments', function () {
    const postCardEl = $(this).closest('.post-card');
    const post = postCardEl.data('post'); 
    const commentEl = postCardEl.find('.comment-list');

    // PLEASE explain what is truly happening here
    // Still, I do not understand the flow of data through this function
    
    setCommentsOnPost(post)
    .then(function (post) { // first time clicked it will load comments & toggle
        post.comments.forEach(function(comment) {
            commentEl.empty()
            commentEl.append(
                $(`
                    <h3>
                        <div>${comment.body}</div>
                        <div>${comment.email}</div>
                    </h3>
                `)
            )
        })
        toggleComments(postCardEl)
    })
    .catch(function () { // does not reload on successive clicks, only toggle
        toggleComments(postCardEl)
    });
});

// INITIALIZE & EXECUTE

// goal: as a user I want a list of users to be display on page load
// input: when the page loads fetchUsers() is invoked and returns a fulfilled promise
// output: the rendered user list loads the HTML for a set of user cards

function bootstrap() {
    fetchUsers().then(function (data) { renderUserList(data); });
    // fetchUsers().then(renderUserList); not a fan
    // refactored code is not explicit enough to remember
}

bootstrap();