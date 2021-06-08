const hjack = (inputtedCommands) => {
  const countDown = 3000;
  let timeUp = true;
  const commands = [];
  let timeoutKey;
  const flush = () => {
    timeUp = true;
    commands.length = 0;
    clearTimeout(timeoutKey);
  };
  const checkHjack = (command) => {
    if (timeUp) {
      return false;
    }
    var parsedCommands = JSON.parse(JSON.stringify(commands));
    if (parsedCommands.length) {
      const comparedCommand = [];
      let trueIndex = -1;
      do {
        const firstCommand = parsedCommands.shift();
        for (let inx = trueIndex + 1; inx < command.length; inx++) {
          if (firstCommand === command[inx]) {
            comparedCommand.push(firstCommand);
            trueIndex = inx;
            break;
          }
          comparedCommand.length = 0;
          trueIndex = -1;
          flush();
          return;
        }
      } while (parsedCommands.length);
      if (comparedCommand.length === command.length) {
        flush();
        return true;
      }
    }
    return false;
  };
  document.addEventListener('keyup', ((evt) => {
    if (!commands.length) {
      timeUp = false;
      timeoutKey = setTimeout(function () {
        flush();
      }, countDown);
    }
    commands.push(evt.which);
    for (let inx = 0; inx < inputtedCommands.length; inx++) {
      const command = inputtedCommands[inx];
      if (checkHjack(command.command)) {
        command.action();
      }
    }
  });
};
