function Component()
{
    // Constructor
}

Component.prototype.isDefault = function()
{
    // Select the component by default
    return true;
}

function createShortcuts()
{
    var windir = installer.environmentVariable("WINDIR");
    if (windir === "") {
        QMessageBox["warning"]("Error", "Error", "Could not find windows installation directory");
        return;
    }

    var cmdLocation = installer.value("TargetDir") + "\\msys2_shell.cmd";
    component.addOperation("CreateShortcut", cmdLocation, "@StartMenuDir@/Yaul (MinGW @BITNESS@).lnk", "-mingw64");

    component.addOperation("Execute",
                           ["@TargetDir@\\usr\\bin\\bash.exe", "--login", "-c", "exit"]);
}

Component.prototype.createOperations = function()
{
    component.createOperations();
    createShortcuts();
}
