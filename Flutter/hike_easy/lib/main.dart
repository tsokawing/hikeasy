// This code section take https://www.youtube.com/watch?v=McPzVZZRniU as reference

import 'dart:async';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'gps.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'hikEasy',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: GPS(title: 'Real-time Location'),
    );
  }
}
