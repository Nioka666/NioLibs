import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import validator from "validator";
import session from "express-session";
import multer from "multer";
import { Conn } from "./config.js";
import {
  AdminModel,
  BukuModel,
  KoleksiPribadiModel,
  PeminjamanModel,
  UserModel,
} from "./models.js";
import {
  BACKEND_HOST,
  BACKEND_PORT,
  CLIENT_HOST,
} from "../utils/server_env.js";

const app = express();
const saltRounds = 10;

const corsOptions = {
  origin: `${CLIENT_HOST}`,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "nioka666",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    name: "admin-session-cookie",
  })
);

app.get("/", (req, res) => {
  res.send("NioLibs is Ready !");
});

app.get("/api/user-list", async (req, res) => {
  try {
    const response = await UserModel.find();
    if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/officers-list", async (req, res) => {
  try {
    const response = await AdminModel.find({ level: "Petugas" });
    if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/user-register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(401).json({ msg: "Invalid Email Address" });
  }

  if (password.length < 8) {
    return res
      .status(401)
      .json({ msg: "Password must be at least 8 characters long" });
  }

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const response = await UserModel.insertMany({
      username,
      email,
      password: hashedPassword,
      tanggal_bergabung: new Date(),
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(401).json({ msg: "Register Failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/admin-sign-in", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.findOne({
      email,
    });
    if (admin) {
      const passwordMatch = bcrypt.compare(password, admin.password);
      req.session.admin = true;
      if (passwordMatch) {
        req.session.admin = {
          _id: admin._id,
          nama_lengkap: admin.nama_lengkap,
          username: admin.username,
          email: admin.email,
          alamat: admin.alamat,
          level: admin.level,
          tanggal_bergabung: admin.tanggal_bergabung,
        };
        res.status(200).json({ msg: "Login Successfully" });
      }
    } else {
      res.status(401).json({ msg: "Failed to Sign in" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/user-sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({
      email,
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.user = {
          _id: user._id,
          nama_lengkap: user.nama_lengkap,
          username: user.username,
          email: user.email,
          alamat: user.alamat,
          tanggal_bergabung: user.tanggal_bergabung,
        };
        res.status(200).json({ msg: "Login Successfully" });
      } else {
        res.status(401).json({ msg: "Failed to Sign in" });
      }
    } else {
      res.status(401).json({ msg: "Failed to Sign in" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/admin-session", async (req, res) => {
  try {
    if (req.session.admin) {
      res.status(200).json(req.session.admin);
    } else {
      res.status(401).json({ msg: "Session Not Found" });
    }
  } catch (error) {
    res.status(401).json({ msg: "Session not found" });
  }
});

app.get("/api/user-session", async (req, res) => {
  try {
    if (req.session.user) {
      res.status(200).json(req.session.user);
    } else {
      res.status(401).json({ msg: "Session Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/user-detail", async (req, res) => {
  const { userID } = req.body;
  try {
    const response = await UserModel.findOne({ _id: userID });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(401).json({ msg: "Cannot find user" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/admin-sign-out", (req, res) => {
  if (req.session.admin) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during admin logout:", err);
        res
          .status(500)
          .json({ message: "Internal server error during logout" });
      } else {
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Admin logout successful" });
      }
    });
  } else {
    res.status(403).json({ message: "No admin session found" });
  }
});

app.post("/api/sign-out", (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during logout:", err);
        res
          .status(500)
          .json({ message: "Internal server error during logout" });
      } else {
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Logout successful" });
      }
    });
  }
});

app.get("/api/book-lists", async (req, res) => {
  try {
    const response = await BukuModel.find();
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(401).json({ msg: "Failed fetching book lists" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/find-book", async (req, res) => {
  const { bookID } = req.body;

  try {
    const response = await BukuModel.findOne({ _id: bookID });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(401).json({ msg: "Can not find this book" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/add-book", async (req, res) => {
  const { bookTitle, bookCover, bookAuthor, bookPublisher, datePublish } =
    req.body;

  try {
    const response = await BukuModel.insertMany({
      judul: bookTitle,
      cover: bookCover,
      penulis: bookAuthor,
      penerbit: bookPublisher,
      tahun_terbit: datePublish,
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ msg: "Failed to Adding book" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/book-rename", async (req, res) => {
  const { bookID, bookTitle, bookStock, bookDescription } = req.body;

  try {
    const response = await BukuModel.findByIdAndUpdate(
      { _id: bookID },
      {
        judul: bookTitle,
        stok: bookStock,
        deskripsi: bookDescription,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/book-saving", async (req, res) => {
  const { userID, bookID, bookTitle, bookAuthor, bookCover } = req.body;
  try {
    const response = await KoleksiPribadiModel.insertMany({
      user_id: userID,
      buku_id: bookID,
      judul: bookTitle,
      penulis: bookAuthor,
      cover: bookCover,
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(401).json({ msg: "Saving Failed, Please try again" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/book-collection-list", async (req, res) => {
  const { userID, bookID } = req.body;
  try {
    const response = await KoleksiPribadiModel.insertMany({
      user_id: userID,
      buku_id: bookID,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/find-book-collection", async (req, res) => {
  const { userID } = req.body;
  try {
    const response = await KoleksiPribadiModel.find({ user_id: userID });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(401).json({ msg: "Can't find book collection" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/borrow-books", async (req, res) => {
  const { userID, bookID, loanTerm } = req.body;
  const currentDate = new Date();
  const tglKembali = new Date(currentDate);
  tglKembali.setDate(currentDate.getDate() + loanTerm);

  try {
    const response = await PeminjamanModel.insertMany({
      user_id: userID,
      buku_id: bookID,
      lama_pinjam: loanTerm,
      tanggal_pinjam: new Date(),
      tanggal_kembali: tglKembali,
      status_pinjam: "Dipinjam",
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(401).json({ msg: "Cannot Borrowing Book" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/show-borrowed-book", async (req, res) => {
  const { userID } = req.body;
  try {
    const response = await PeminjamanModel.find({ user_id: userID });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ msg: "Can't find borrowing details" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/delete-book", async (req, res) => {
  const { bookID } = req.body;
  try {
    const response = await KoleksiPribadiModel.deleteOne({
      _id: bookID,
      buku_id: bookID,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});

// File Upload
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "src/img/evidence");
  },
  filename: function (req, file, callback) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const sanitizedFileName = file.originalname.replace(/\s+/g, "_");
    const generatedFileName = `ss_evidence_${currentDate}_${sanitizedFileName}`;

    callback(null, generatedFileName);
  },
});

const upload = multer({ storage: storage });

const startServer = async () => {
  await Conn();
  app.listen(BACKEND_PORT, () => {
    console.log(`Server is running on ${BACKEND_HOST}`);
  });
};

startServer();
