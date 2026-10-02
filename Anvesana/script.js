/* ========================================
   ANVEṢAṆA
   Website Brain
======================================== */


/* ========================================
   SUPABASE
======================================== */

const SUPABASE_URL =
    "https://jdghfqvhqkjrbgvsoskt.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_I4vm084MARHTLUd4wIcMGw_21DlWR5K";

const db = window.db;

window.db =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );



document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ========================================
           STARDUST
        ======================================== */

        let stardust =
            Number(
                localStorage.getItem("stardust")
            ) || 0;


        let stardustHistory =
            JSON.parse(
                localStorage.getItem(
                    "stardustHistory"
                )
            ) || [];


        function saveStardust() {

            localStorage.setItem(
                "stardust",
                stardust
            );

        }


        function saveStardustHistory() {

            localStorage.setItem(
                "stardustHistory",
                JSON.stringify(
                    stardustHistory
                )
            );

        }


        function addStardustHistory(
            description,
            amount
        ) {

            stardustHistory.unshift({

                description: description,

                amount: amount

            });


            stardustHistory =
                stardustHistory.slice(0, 10);


            saveStardustHistory();

            updateStardustHistory();

        }


        function earnStardust(
            amount,
            description
        ) {

            stardust += amount;

            saveStardust();


            if (description) {

                addStardustHistory(
                    description,
                    amount
                );

            }


            updateStardustDisplay();

        }


        function updateStardustDisplay() {

            const display =
                document.getElementById(
                    "stardustTotal"
                );


            if (display) {

                display.textContent =
                    stardust;

            }

        }


        function updateStardustHistory() {

            const history =
                document.getElementById(
                    "stardustHistory"
                );


            if (!history) {

                return;

            }


            history.innerHTML = "";


            if (
                stardustHistory.length === 0
            ) {

                const empty =
                    document.createElement(
                        "p"
                    );


                empty.className =
                    "empty-history";


                empty.textContent =
                    "Your Stardust journey starts here.";


                history.appendChild(
                    empty
                );


                return;

            }


            stardustHistory.forEach(
                function (entry) {

                    const item =
                        document.createElement(
                            "p"
                        );


                    item.className =
                        "history-entry";


                    const sign =
                        entry.amount > 0
                            ? "+"
                            : "−";


                    item.textContent =
                        "✦ " +
                        entry.description +
                        " " +
                        sign +
                        Math.abs(
                            entry.amount
                        );


                    history.appendChild(
                        item
                    );

                }
            );

        }


        /* ========================================
           STARDUST PANEL
        ======================================== */

        const stardustButton =
            document.getElementById(
                "stardustButton"
            );


        const stardustPanel =
            document.getElementById(
                "stardustPanel"
            );


        if (
            stardustButton &&
            stardustPanel
        ) {

            stardustButton.addEventListener(
                "click",
                function () {

                    stardustPanel.classList.toggle(
                        "open"
                    );

                }
            );

        }
/* ========================================
   ACCOUNT PANEL
======================================== */

const accountButton =
    document.getElementById(
        "accountButton"
    );

const accountPanel =
    document.getElementById(
        "accountPanel"
    );


if (
    accountButton &&
    accountPanel
) {

    accountButton.addEventListener(
        "click",
        function () {

            accountPanel.classList.toggle(
                "open"
            );

        }
    );

}


/* ========================================
   ACCOUNT PAGE NAVIGATION
======================================== */

const showSignup =
    document.getElementById(
        "showSignup"
    );

const showLogin =
    document.getElementById(
        "showLogin"
    );


if (showSignup) {

    showSignup.addEventListener(
        "click",
        function () {

            window.location.href =
                "signup.html";

        }
    );

}


if (showLogin) {

    showLogin.addEventListener(
        "click",
        function () {

            window.location.href =
                "login.html";

        }
    );

}
        /* ========================================
           ACCOUNT AUTHENTICATION
        ======================================== */

        const signupForm =
            document.getElementById(
                "signupForm"
            );


        const loginForm =
            document.getElementById(
                "loginForm"
            );


        /* ========================================
           SIGN UP
        ======================================== */

        if (signupForm) {

            signupForm.addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    const email =
                        document.getElementById(
                            "signupEmail"
                        ).value.trim();


                    const password =
                        document.getElementById(
                            "signupPassword"
                        ).value;


                    const message =
                        document.getElementById(
                            "signupMessage"
                        );


                    message.textContent =
                        "Creating your account...";


                    const {
                        data,
                        error
                    } =
                        await db.auth.signUp({

                            email:
                                email,

                            password:
                                password

                        });


                    if (error) {

                        console.error(
                            "Supabase signup error:",
                            error
                        );


                        message.textContent =
                            error.message;

                        return;

                    }


                    if (
                        data &&
                        data.session
                    ) {

                        message.textContent =
                            "✦ Your account has been created!";


                        setTimeout(
                            function () {

                                window.location.href =
                                    "index.html";

                            },
                            1200
                        );


                    } else {

                        message.textContent =
                            "✦ Account created! Check your email to confirm your account.";

                    }

                }
            );

        }


        /* ========================================
           LOG IN
        ======================================== */

        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    const email =
                        document.getElementById(
                            "loginEmail"
                        ).value.trim();


                    const password =
                        document.getElementById(
                            "loginPassword"
                        ).value;


                    const message =
                        document.getElementById(
                            "loginMessage"
                        );


                    message.textContent =
                        "Logging in...";


                    const {
                        data,
                        error
                    } =
                        await db.auth.signInWithPassword({

                            email:
                                email,

                            password:
                                password

                        });


                    if (error) {

                        console.error(
                            "Supabase login error:",
                            error
                        );


                        message.textContent =
                            error.message;

                        return;

                    }


                    message.textContent =
                        "✦ Welcome back!";


                    setTimeout(
                        function () {

                            window.location.href =
                                "index.html";

                        },
                        800
                    );

                }
            );

        }
        /* ========================================
           PUZZLE
        ======================================== */

        const puzzleAnswers =
            document.querySelectorAll(
                ".puzzle-answer"
            );


        const puzzleMessage =
            document.getElementById(
                "puzzleMessage"
            );


        puzzleAnswers.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {


                        if (
                            localStorage.getItem(
                                "puzzle01Solved"
                            ) === "true"
                        ) {

                            return;

                        }


                        if (
                            button.dataset.answer ===
                            "32"
                        ) {

                            localStorage.setItem(
                                "puzzle01Solved",
                                "true"
                            );


                            earnStardust(
                                1,
                                "Puzzle reward"
                            );


                            if (puzzleMessage) {

                                puzzleMessage.textContent =
                                    "✦ Correct! You earned 1 Stardust.";

                            }


                            puzzleAnswers.forEach(
                                function (otherButton) {

                                    otherButton.disabled =
                                        true;

                                }
                            );

                        } else {

                            if (puzzleMessage) {

                                puzzleMessage.textContent =
                                    "Not quite. Try again.";

                            }

                        }

                    }
                );

            }
        );


       /* ========================================
   WRITE
======================================== */

const writingForm =
    document.getElementById(
        "writingForm"
    );


if (writingForm) {

    writingForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const titleElement =
                document.getElementById(
                    "writingTitle"
                );


            const authorElement =
                document.getElementById(
                    "writingAuthor"
                );


            const contentElement =
                document.getElementById(
                    "writingContent"
                );


            const message =
                document.getElementById(
                    "writingMessage"
                );


            const title =
                titleElement.value.trim();


            const author =
                authorElement.value.trim();


            const content =
                contentElement.value.trim();


            const publishChoice =
                document.querySelector(
                    'input[name="publishChoice"]:checked'
                );


            if (
                title === "" ||
                author === "" ||
                content === ""
            ) {

                message.textContent =
                    "Please fill everything in.";

                return;

            }


            const published =
                !publishChoice ||
                publishChoice.value === "publish";


            /*
             * Find out whether the writer
             * is logged in.
             *
             * If they are logged in,
             * we save their user ID.
             *
             * If they are not logged in,
             * userId stays null.
             */

            const {
                data: {
                    user
                }
            } = await db.auth.getUser();


            const userId =
                user
                    ? user.id
                    : null;


            message.textContent =
                "Publishing...";


            const {
                error
            } =
                await db
                    .from("Writings")
                    .insert({

                        title:
                            title,

                        author:
                            author,

                        content:
                            content,

                        published:
                            published,

                        user_id:
                            userId

                    });


            if (error) {

                console.error(
                    "Supabase writing error:",
                    error
                );


                message.textContent =
                    "Database error: " +
                    error.message;

                return;

            }


            if (published) {

                message.textContent =
                    "✦ Published! Your creation is now in Read.";

            } else {

                message.textContent =
                    "✦ Saved privately.";

            }


            titleElement.value = "";

            authorElement.value = "";

            contentElement.value = "";

        }
    );

}
        /* ========================================
           READ
        ======================================== */

    /* READ */

let currentBook = null;
let currentPages = [];
let currentPageIndex = 0;


/* =========================
   LOAD LIBRARY
   ========================= */

async function loadPublishedWritings() {

    const container =
        document.getElementById("publishedWritings");

    if (!container) return;

    container.innerHTML =
        '<p class="library-loading">Searching the shelves...</p>';

    const {
        data,
        error
    } =
        await db
            .from("Writings")
            .select(
                "id, title, author, content, created_at"
            )
            .eq(
                "published",
                true
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Supabase read error:",
            error
        );

        container.innerHTML =
            "<p class='library-empty'>The library couldn't be opened right now.</p>";

        return;
    }


    if (!data || data.length === 0) {

        container.innerHTML = `
            <div class="library-empty">
                <h2>🌙 The shelves are empty.</h2>
                <p>Perhaps someone should write a book...</p>
            </div>
        `;

        return;
    }


    container.innerHTML = "";


    data.forEach(
        function(writing) {

            const book =
                document.createElement("article");

            book.className =
                "library-book";

            book.title =
                "Open " + writing.title;


            const cover =
                document.createElement("div");

            cover.className =
                "library-book-cover";


            const title =
                document.createElement("div");

            title.className =
                "library-book-title";

            title.textContent =
                writing.title;


            const author =
                document.createElement("div");

            author.className =
                "library-book-author";

            author.textContent =
                "by " + writing.author;


            cover.appendChild(title);
            cover.appendChild(author);

            book.appendChild(cover);


            book.addEventListener(
                "click",
                function() {

                    openBook(writing);

                }
            );


            container.appendChild(book);

        }
    );

}


/* =========================
   TURN CONTENT INTO PAGES
   ========================= */

function createBookPages(content) {

    const paragraphs =
        String(content || "")
            .split(/\n\s*\n/);


    const pages = [];

    let currentPage = "";

    /*
       This is deliberately approximate.

       Instead of counting exact pixels,
       we divide the writing into chunks
       that fit comfortably on a book page.
    */

    const maxCharacters =
        850;


    paragraphs.forEach(
        function(paragraph) {

            const cleanParagraph =
                paragraph.trim();

            if (!cleanParagraph) return;


            if (
                currentPage.length +
                cleanParagraph.length +
                2
                >
                maxCharacters
            ) {

                if (currentPage.trim()) {

                    pages.push(
                        currentPage.trim()
                    );

                }

                currentPage =
                    cleanParagraph;

            } else {

                if (currentPage) {

                    currentPage +=
                        "\n\n";

                }

                currentPage +=
                    cleanParagraph;

            }

        }
    );


    if (currentPage.trim()) {

        pages.push(
            currentPage.trim()
        );

    }


    if (pages.length === 0) {

        pages.push(
            "This book is empty."
        );

    }


    return pages;
}


/* =========================
   OPEN BOOK
   ========================= */

function openBook(writing) {

    currentBook =
        writing;

    currentPages =
        createBookPages(
            writing.content
        );

    currentPageIndex =
        0;


    const libraryView =
        document.getElementById(
            "libraryView"
        );

    const bookView =
        document.getElementById(
            "bookView"
        );


    const title =
        document.getElementById(
            "readingBookTitle"
        );

    const author =
        document.getElementById(
            "readingBookAuthor"
        );


    title.textContent =
        writing.title;

    author.textContent =
        "by " + writing.author;


    libraryView.style.display =
        "none";

    bookView.style.display =
        "block";


    renderBookPages();


    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}


/* =========================
   RENDER TWO PAGES
   ========================= */

function renderBookPages() {

    const left =
        document.getElementById(
            "leftPage"
        );

    const right =
        document.getElementById(
            "rightPage"
        );


    const leftNumber =
        document.getElementById(
            "leftPageNumber"
        );

    const rightNumber =
        document.getElementById(
            "rightPageNumber"
        );


    const indicator =
        document.getElementById(
            "pageIndicator"
        );


    const previous =
        document.getElementById(
            "previousPage"
        );

    const next =
        document.getElementById(
            "nextPage"
        );


    /*
       Clear old pages.
    */

    left.innerHTML = "";
    right.innerHTML = "";


    /*
       LEFT PAGE
    */

    if (
        currentPages[currentPageIndex]
    ) {

        addPageText(
            left,
            currentPages[currentPageIndex]
        );

        leftNumber.textContent =
            currentPageIndex + 1;

    } else {

        leftNumber.textContent =
            "";

    }


    /*
       RIGHT PAGE
    */

    if (
        currentPages[currentPageIndex + 1]
    ) {

        addPageText(
            right,
            currentPages[currentPageIndex + 1]
        );

        rightNumber.textContent =
            currentPageIndex + 2;

    } else {

        rightNumber.textContent =
            "";

    }


    /*
       PAGE INDICATOR
    */

    const firstPage =
        currentPageIndex + 1;

    const secondPage =
        Math.min(
            currentPageIndex + 2,
            currentPages.length
        );


    indicator.textContent =
        "Pages " +
        firstPage +
        "–" +
        secondPage;


    /*
       BUTTONS
    */

    previous.disabled =
        currentPageIndex <= 0;

    next.disabled =
        currentPageIndex + 2 >=
        currentPages.length;

}


/* =========================
   PUT TEXT ON PAGE
   ========================= */

function addPageText(
    element,
    text
) {

    const paragraphs =
        text.split(/\n\s*\n/);


    paragraphs.forEach(
        function(paragraph) {

            const p =
                document.createElement(
                    "p"
                );

            p.textContent =
                paragraph.trim();

            element.appendChild(p);

        }
    );

}


/* =========================
   NEXT / PREVIOUS
   ========================= */

function nextBookPages() {

    if (
        currentPageIndex + 2
        <
        currentPages.length
    ) {

        currentPageIndex += 2;

        renderBookPages();

        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        );

    }

}


function previousBookPages() {

    if (
        currentPageIndex >= 2
    ) {

        currentPageIndex -= 2;

        renderBookPages();

        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        );

    }

}


/* =========================
   BACK TO LIBRARY
   ========================= */

function closeBook() {

    const libraryView =
        document.getElementById(
            "libraryView"
        );

    const bookView =
        document.getElementById(
            "bookView"
        );


    bookView.style.display =
        "none";

    libraryView.style.display =
        "block";


    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}


/* =========================
   READ STARTUP
   ========================= */

const backToLibrary =
    document.getElementById(
        "backToLibrary"
    );

if (backToLibrary) {

    backToLibrary.addEventListener(
        "click",
        closeBook
    );

}


const nextPage =
    document.getElementById(
        "nextPage"
    );

if (nextPage) {

    nextPage.addEventListener(
        "click",
        nextBookPages
    );

}


const previousPage =
    document.getElementById(
        "previousPage"
    );

if (previousPage) {

    previousPage.addEventListener(
        "click",
        previousBookPages
    );

}


/*
   The book view starts hidden.
*/

const bookView =
    document.getElementById(
        "bookView"
    );

if (bookView) {

    bookView.style.display =
        "none";

}


/*
   Load the library.
*/

loadPublishedWritings();

// =====================================
// VENU
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const venuCharacter =
            document.getElementById("venuCharacter");

        const talkToVenu =
            document.getElementById("talkToVenu");

        const venuDialogue =
            document.getElementById("venuDialogue");

        const venuDialogueText =
            document.getElementById("venuDialogueText");


        // Stop if Venu's HTML is not on this page
        if (
            !talkToVenu ||
            !venuDialogue ||
            !venuDialogueText
        ) {
            return;
        }


        // =====================================
        // VENU CLICK COUNT
        // =====================================

        let venuClicks =
            Number(
                localStorage.getItem(
                    "venuClicks"
                )
            ) || 0;


        // =====================================
        // TALK TO VENU
        // =====================================

        function talkToVenuNow() {

            venuClicks++;

            localStorage.setItem(
                "venuClicks",
                venuClicks
            );


            venuDialogue.style.display =
                "block";


            venuDialogueText.textContent =
                "Oh! Hello there. What can I help you with?";

        }


        // Talk button
        talkToVenu.addEventListener(
            "click",
            talkToVenuNow
        );


        // Venu herself
        if (venuCharacter) {

            venuCharacter.addEventListener(
                "click",
                talkToVenuNow
            );

        }


        // =====================================
        // VENU CHOICES
        // =====================================

        const venuChoices =
            document.querySelectorAll(
                "[data-venu-action]"
            );


        venuChoices.forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const action =
                            button.getAttribute(
                                "data-venu-action"
                            );


                        switch (action) {

                            case "help":

                                venuDialogueText.textContent =
                                    "You can explore the different sections of Anveṣaṇa using the navigation above. Read lets you explore books, Write lets you create them, Play has things to discover, and Character is where you can build your own explorer.";

                                break;


                            case "updates":

                                venuDialogueText.textContent =
                                    "There aren't any new announcements just yet. But keep exploring. You never know what might appear among the stars.";

                                break;


                            case "about":

                                venuDialogueText.textContent =
                                    "Anveṣaṇa is a little universe built for curiosity. You can read, write, play, learn, focus, and create your own explorer while collecting Stardust along the way.";

                                break;


                            case "bye":

                                venuDialogueText.textContent =
                                    "Alright. I'll get back to my writing. There are quite a few things left to put on these pages.";


                                setTimeout(
                                    function() {

                                        venuDialogue.style.display =
                                            "none";

                                    },
                                    1800
                                );

                                break;

                        }

                    }
                );

            }
        );

    }
);

        /* ========================================
           STARTUP
        ======================================== */

        updateStardustDisplay();

        updateStardustHistory();

    }
);