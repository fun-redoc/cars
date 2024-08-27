function neuerGeisterfahrer () {
    geisterfahrer_y = 0
    geisterfahrer_x = randint(1, 3)
}
function löscheZeile (zeile: number) {
    led.unplot(0, zeile)
    led.unplot(1, zeile)
    led.unplot(2, zeile)
    led.unplot(3, zeile)
    led.unplot(4, zeile)
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    auto_position_x = auto_position_x - 1
})
function prüfeUnfall () {
    if (auto_position_x == 0) {
        status = "end"
    }
    if (auto_position_x == 4) {
        status = "end"
    }
    if (auto_position_x == geisterfahrer_x && auto_position_y == geisterfahrer_y) {
        status = "end"
    }
}
function zeigeStatusEnd () {
    basic.showString("END")
}
function zeigeStrasse () {
    for (let Index = 0; Index <= 4; Index++) {
        löscheZeile(Index)
        if (strasse_nummer == 0) {
            if (Index % 2 == 0) {
                led.plot(0, Index)
                led.plot(4, Index)
            }
        } else {
            if (Index % 2 != 0) {
                led.plot(0, Index)
                led.plot(4, Index)
            }
        }
    }
}
function zeigeGeisterfahrer () {
    if (input.runningTime() - geisterfahrer_zeit >= 300) {
        geisterfahrer_y += 1
        geisterfahrer_zeit = input.runningTime()
    }
    if (geisterfahrer_y > 4) {
        neuerGeisterfahrer()
    }
    led.plot(geisterfahrer_x, geisterfahrer_y)
}
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    status = "start"
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    auto_position_x = auto_position_x + 1
})
function zeigeStatusStart () {
    löscheLEDS()
    auto_position_x = 2
    auto_position_y = 4
    status = "spiel"
    strasse_nummer = 0
    zeit = input.runningTime()
    geisterfahrer_zeit = input.runningTime()
    neuerGeisterfahrer()
}
function zeigeStatusSpiel () {
    prüfeUnfall()
    zeit_vergangen = input.runningTime() - zeit
    auto_position_x = Math.constrain(auto_position_x, 0, 4)
    if (zeit_vergangen >= 500) {
        if (strasse_nummer == 0) {
            strasse_nummer = 1
        } else {
            strasse_nummer = 0
        }
        zeit = input.runningTime()
    }
    zeigeStrasse()
    zeigeGeisterfahrer()
    led.plot(auto_position_x, auto_position_y)
}
function löscheLEDS () {
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            led.unplot(x, y)
        }
    }
}
let zeit_vergangen = 0
let zeit = 0
let geisterfahrer_zeit = 0
let strasse_nummer = 0
let auto_position_y = 0
let auto_position_x = 0
let geisterfahrer_x = 0
let geisterfahrer_y = 0
let status = ""
status = "start"
basic.forever(function () {
    if (status == "start") {
        zeigeStatusStart()
    } else if (status == "end") {
        zeigeStatusEnd()
    } else {
        zeigeStatusSpiel()
    }
})
