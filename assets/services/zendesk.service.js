(function () {
  'use strict';

  angularjs.service('zendeskService', ["$q", function ($q) {

    var client = ZAFClient.init();

    return {

      createNoteRecord: function (note, ticketID) {

        var deferred = $q.defer();
        var ObjectID = 'bloco_de_notas';

        var data = JSON.stringify({
          "custom_object_record": {
            "custom_object_fields": {
              "textarea": note,
            },
            "name": ticketID.toString()
          }
        });

        //console.log(data);

        client.request({
          url: '/api/v2/custom_objects/'+ObjectID+'/records',
          type: 'POST',
          data: data,
          contentType: 'application/json'
        }).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error)
        });
        return deferred.promise;
      },

      getNoteRecord: function (ticketID) {

        var deferred = $q.defer();
        var ObjectID = 'bloco_de_notas';

        client.request({
          url: '/api/v2/custom_objects/'+ObjectID+'/records/search',
          type: 'GET',
          contentType: 'application/json',
          params: {
            'name': ticketID,
          },        
        }).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error)
        });
        return deferred.promise;
      },

      updateNoteRecord: function (note, ObjectRecordID) {

        var deferred = $q.defer();
        var ObjectID = 'bloco_de_notas';

        var data = JSON.stringify({
          "custom_object_record": {
            "custom_object_fields": {
              "textarea": note,
            },
          }
        });

        //console.log(data);

        client.request({
          url: '/api/v2/custom_objects/'+ObjectID+'/records/'+ObjectRecordID,
          type: 'PATCH',
          data: data,
          contentType: 'application/json'
        }).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error)
        });
        return deferred.promise;
      },

    }

  }])

})();