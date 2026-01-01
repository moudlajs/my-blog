---
title: "The Leap Second That Wasn't"
pubDatetime: 2025-12-31
author: "Daniel Czetner"
description: "Why engineers around the world held their breath last night, and the strange story of the second that never was."
tags:
  - leap-second
  - timekeeping
  - ntp
  - os-dev
---

As the world counted down to midnight, engineers, sysadmins, and kernel developers were holding their breath for a different reason. They weren't worried about the ball dropping; they were worried about the clock stopping, jumping, or smearing. They were worried about the leap second.

And this year, the ghost story has a happy ending: the leap second wasn't there.

### What is a Leap Second, and Why is it Scary?

A leap second is a one-second adjustment occasionally added to Coordinated Universal Time (UTC) to keep it in sync with the Earth's irregular rotation. Think of it as a tiny, global time-out.

For most people, it's unnoticeable. For a computer, it's a crisis of logic. Time is supposed to be linear and always move forward. A leap second breaks this fundamental rule. A single day can have a minute with 61 seconds, like `23:59:60`.

This single, extra second has caused real-world outages for major systems in the past. It can crash operating systems, corrupt data, and throw distributed networks that rely on precise time synchronization into chaos. The Network Time Protocol (NTP) has ways to handle it (like "smearing" the extra second over a longer period), but it's a patch on a fundamentally weird problem.

### The Sigh of Relief

The international body responsible for timekeeping (the IERS) announced that no leap second would be added on December 31, 2025. This means that as midnight UTC struck, every system clock in the world ticked over from `23:59:59` to `00:00:00` without any drama.

It's a non-event, and that's exactly what makes it a perfect event for engineers. Nothing breaking is the best possible outcome.

In fact, the tech world is collectively trying to get rid of the leap second entirely. The current plan is to let the Earth's time and UTC drift apart, potentially for a century, before making a larger correction. For now, we can all enjoy a new year that arrived precisely on time.
