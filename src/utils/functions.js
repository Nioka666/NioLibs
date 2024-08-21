import axios from "axios";
import { BACKEND_HOST } from "./client_env.js";

class AuthService {
  static async doAdminSignIn(email, password) {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/admin-sign-in`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async checkAdminSession() {
    try {
      const response = await axios.get(`${BACKEND_HOST}/api/admin-session`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // console.log(error);
    }
  }

  static async checkAdminSessionStatus() {
    try {
      const response = await axios.get(`${BACKEND_HOST}/api/admin-session`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async doUserRegister(username, email, password) {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/user-register`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async doUserSignIn(email, password) {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/user-sign-in`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async checkUserSession() {
    try {
      const response = await axios.get(`${BACKEND_HOST}/api/user-session`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // console.log(error);
    }
  }

  static async checkUserSessionStatus() {
    try {
      const response = await axios.get(`${BACKEND_HOST}/api/user-session`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      // console.log(error);
    }
  }

  static async getUserDetail(userID) {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/user-detail`,
        { userID },
        {
          withCredentials: false,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async doAdminSignOut() {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/admin-sign-out`,
        null,
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async doUserSignOut() {
    try {
      const response = await axios.post(`${BACKEND_HOST}/api/sign-out`, null, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

class AdminActions {
  static async getUsersList() {
    try {
      const response = await axios.get(`${BACKEND_HOST}/api/user-list`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getOfficersList() {
    try {
      const response = await axios.get(`${BACKEND_HOST}/api/officers-list`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getBookLists() {
    try {
      const response = await axios.get(`${BACKEND_HOST}/api/book-lists`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async addBooks(
    bookTitle,
    bookCover,
    bookAuthor,
    bookPublisher,
    datePublish
  ) {
    try {
      const response = await axios.post(`${BACKEND_HOST}/api/add-book`, {
        bookTitle,
        bookCover,
        bookAuthor,
        bookPublisher,
        datePublish,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

class UserActions {
  static async borrowingsBook(userID, bookID, loanTerm) {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/borrow-books`,
        { userID, bookID, loanTerm },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async findBorrowingDetails(userID) {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/show-borrowed-book`,
        { userID },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async savingsBook(userID, bookID, bookTitle, bookAuthor, bookCover) {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/book-saving`,
        { userID, bookID, bookTitle, bookAuthor, bookCover },
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async findBookCollectionById(userID) {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/find-book-collection`,
        { userID },
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

class BookService {
  static async fetchBookLists() {
    try {
      const response = await axios.get(`${BACKEND_HOST}/api/book-lists`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async findBookById(bookID) {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/find-book`,
        { bookID },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async renameBookById(bookID, bookTitle, BookStock, bookDescription) {
    try {
      const response = await axios.post(`${BACKEND_HOST}/api/book-rename`, {
        _id: bookID,
        judul: bookTitle,
        stok: BookStock,
        deskripsi: bookDescription,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteBookById(bookID) {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/delete-book`,
        {
          bookID,
        },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export { AuthService, AdminActions, BookService, UserActions };
