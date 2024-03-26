(function () {
  'use strict';

  angularjs.controller('angularjs', ['$scope', 'zendeskService', function ($scope, zendeskService) {

    client.get('ticket').then(function (data) {

      zendeskService.getNoteRecord(data.ticket.id).then(function (record) {
        var elementFound = false;

        record.custom_object_records.forEach(element => {

          if (element.name === data.ticket.id.toString()) {

            elementFound = true;

            document.getElementById('note').value = element.custom_object_fields.textarea;

            document.getElementById('insertNote').addEventListener('submit', function (event) {
              event.preventDefault()

              var note = document.getElementById('note').value;

              zendeskService.updateNoteRecord(note, element.id).then(function (data) {
                $scope.saved = 'Nota salva com sucesso';
                $('#avisoModal').modal('show');
              }).catch(function (error) {
                $scope.saved = error.responseText;
                $('#avisoModal').modal('show');
                console.log(error.responseText)
              })
            });
          }
        });


        if (!elementFound) {
          document.getElementById('insertNote').addEventListener('submit', function (event) {
            event.preventDefault()

            var note = document.getElementById('note').value;

            zendeskService.createNoteRecord(note, data.ticket.id).then(function (data) {
              $scope.saved = 'Nota salva com sucesso';
              $('#avisoModal').modal('show');
              console.log(data)
            }).catch(function (error) {
              $scope.saved = error.responseText;
              $('#avisoModal').modal('show');
              console.log(error)
            })
          });
        }
      })

    });
  }]);

})();