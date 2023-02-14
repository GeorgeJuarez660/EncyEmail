import pathlib
import requests

from flask import Flask, render_template, url_for, redirect, flash, session, abort, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import InputRequired, Length, ValidationError, Regexp, EqualTo, Email, DataRequired
from flask_bcrypt import Bcrypt
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests


import os
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'


app = Flask(__name__)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'thisisasecretkey'


login_manager = LoginManager(app)
login_manager.init_app(app)
login_manager.login_view = "login"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
   __tablename__ = 'User'

   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(50), nullable=False)
   surname = db.Column(db.String(50), nullable=False)
   email = db.Column(db.String(80), nullable=False, unique=True)
   username = db.Column(db.String(20), nullable=False, unique=True)
   password = db.Column(db.String(80), nullable=False)


class WishList(db.Model):
   __tablename__ = 'WishList'

   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(100), nullable=False)
   description = db.Column(db.String(200))
   user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)


class RegisterForm(FlaskForm):
      name = StringField(validators=[InputRequired(), Length(min=3, max=50), Regexp("^[A-Za-z]*$", 0, "Il nome deve contenere solo lettere")], render_kw={"placeholder": "inserisci il nome"})
      surname = StringField(validators=[InputRequired(), Length(min=3, max=50), Regexp("^[A-Za-z]*$", 0, "Il cognome deve contenere solo lettere")], render_kw={"placeholder": "inserisci il cognome"})
      email = StringField(validators=[InputRequired(), Length(min=4, max=250), Regexp("[^@]+@[^@]+\.[^@]+", 0, "L'email inserito è invalido")], render_kw={"placeholder": "inserisci l'email"})
      username = StringField(validators=[InputRequired(), Length(min=4, max=25, message="Inserisci un username da 4 caratteri"), Regexp("^[A-Za-z][A-Za-z0-9_.]*$", 0, "L'username deve contenere solo lettere, numeri, punti e underscore")], render_kw={"placeholder": "inserisci l'username"})
      password = PasswordField(validators=[InputRequired(), Length(min=4, max=25)], render_kw={"placeholder": "inserisci la password"})
      conf_password = PasswordField(validators=[InputRequired(), Length(min=4, max=25), EqualTo("password", message="Le password non coincidono")], render_kw={"placeholder": "conferma la password"})

      submit = SubmitField("REGISTRATI")

      def validate_email(self, email):
                alrexi_email = User.query.filter_by(email=email.data).first()
                if alrexi_email:
                   raise ValidationError("Email già esistente. Sceglitene un'altra")

      def validate_username(self, username):
          alrexi_username = User.query.filter_by(username=username.data).first()
          if alrexi_username:
             raise ValidationError("Username già esistente. Sceglitene un altro")
          
class LoginForm(FlaskForm):
      username = StringField(validators=[InputRequired(), Length(min=4, max=25)], render_kw={"placeholder": "inserisci l'username"})
      password = PasswordField(validators=[InputRequired(), Length(min=4, max=25)], render_kw={"placeholder": "inserisci la password"})
      remember = BooleanField('Ricordami')

      submit = SubmitField("ACCEDI")

class WishListForm(FlaskForm):
      name = StringField('Nome', validators=[DataRequired()])
      description = StringField('Descrizione')

      submit = SubmitField('Creazione Wishlist')


@app.route('/')
def index():
   return render_template('index.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
   form = RegisterForm()
   msg = ""

   if form.validate_on_submit():
    try:
      hashed_password = bcrypt.generate_password_hash(form.password.data)
      new_user = User(name=form.name.data, surname=form.surname.data, email=form.email.data, username=form.username.data, password=hashed_password)
      db.session.add(new_user)
      db.session.commit()
      flash(f"Registrazione avvenuta con successo", "success")
      return redirect(url_for('login'))

    except Exception as e:
        flash(e, "danger")

   return render_template('register.html', form=form, msg=msg)


@app.route('/login', methods=['GET', 'POST'])
def login():
   form = LoginForm()
   msg = ""

   if form.validate_on_submit():
      user = User.query.filter_by(username=form.username.data).first()
      if user:
         if bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for('homepage'))
         else:
             msg = "Username o password non validi"
      else:
          msg = "Username o password non validi"

   return render_template('login.html', form=form, msg=msg)

@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    session.clear()
    logout_user()
    return redirect(url_for('login'))


if __name__ == '__main__': #Serve per runnare l'app dal localhost nella porta 5500
    app.run(host="localhost", port=5500, debug=True)