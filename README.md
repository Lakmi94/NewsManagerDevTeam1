This repository contains the solutions for the **Programming of User Interfaces** Angular exercises.
All tasks are done in **groups of three**.

---

## Authors

* Djamila Zimmermann
* Nasim Ghorbani-Elizeh
* Lakmi Pabasara Kulathunga Weerapperuma Achchi Athukoralage

---

### 📘 Project Overview

Develop a **News Manager Application** integrating three interfaces:

* **Web (Angular)**
* **Desktop (JavaFX)**
* **Android**

The project follows the **CRUD pattern** (Create, Read, Update, Delete) and connects to a REST API using an API key system for authentication.

---

### Web Application (Angular)

#### Functional Requirements

* Show list of articles on main page (title, subtitle, abstract, thumbnail).
* Clicking title/image → open article details page.
* **Logged-in users** can:

  * Create new articles.
  * Edit existing articles.
  * Delete articles (with confirmation and feedback).
* Include **category filter** and **text search** in the navigation bar.
* Support responsive design (collapsible navbar on mobile).

#### Article Details Page

* Show title, subtitle, abstract, category, body, and image.
* Display last modification date and user.
* No editing allowed here.
* Render HTML content correctly.

#### Article Edition / Creation Form

* Form fields: title, subtitle, abstract, body (HTML), category (dropdown), image.
* Validate all mandatory fields (title, category, abstract).
* Include buttons: “Save”, “Cancel/Back to Main Page”.
* Provide user feedback after save.

#### Login Form

* Username + password fields on main page.
* On success → replace with “Hello [username]” + logout button.
* On failure → show error message.

#### Technical Details

* Framework: **Angular (Single Page Application)** + **Bootstrap**.
* Use services:

  * `NewsService` – API communication.
  * `LoginService` – Authentication handling.
* Manage API keys:

  * Anonymous key for default access.
  * User key after login; restore anonymous key on logout.
* For images: use base64 encoding and proper media type display.

# Testing GIT 
hello world
