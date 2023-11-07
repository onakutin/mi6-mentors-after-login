<!DOCTYPE html>
<html>
    <head>
        <title>Laravel + React</title>
        <!-- Styles -->
        @vite(['resources/css/app.scss'])
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body>

        <div id="people-of-interest-app"></div>

        @viteReactRefresh
        @vite('resources/js/people_of_interest.jsx')
    </body>
</html>
