<p align="center"><img src="https://raw.githubusercontent.com/pitinata/APQ/main/public/image/logo.png" width="400"></p>

<p align="center">
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About APQ

This web application can generate sheets of simple mathematic question with your choice of generator criteria and calculated answer.
Our web application is here to take care of the math problem generating so you can concentrate on the math problem solving.

## Installation
### Prerequisite
- PHP 8.0
- Composer
- Docker

### Installation Steps
1. Clone project from github
2. Run 
```
composer install
```
3. Copy .env.example file and rename it to .env and Setup database users
4. Run 
```
php artisan key:generate
```
5. Then start website using command
```
./vendor/bin/sail up
```
6. Migrate database using
```
php artisan migrate
```
7. Access website via http://localhost/

## License

The APQ is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
