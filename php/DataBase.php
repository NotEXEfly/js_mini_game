<?php

class DataBase
{
    /**
     * @return PDO object
     */
    public static function Connect()
    {  
        $params = array(
            'host' => '62.109.20.191',
            'dbname' => 'game_db',
            'user' => 'game',
            'password' => '113322',
        );

        $dsn = "mysql:host={$params['host']};dbname={$params['dbname']};charset=utf8";
        $opt = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        return new PDO($dsn, $params['user'], $params['password'], $opt);
    }
}
