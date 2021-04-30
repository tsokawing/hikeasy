/*
  What: This is the core part of the flutter application
  Where: mobile application
  Why: This givse us the framework of the application
  How: This is the main page that will call the gps class
*/

import 'package:flutter/material.dart';
import 'gps.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'HikEasy',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: GPS(title: 'Real-time Location'),
    );
  }
}
